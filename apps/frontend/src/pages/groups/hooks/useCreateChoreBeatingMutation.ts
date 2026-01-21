import { useMutation } from "@tanstack/react-query";

import { createChoreBeating } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";

interface CreateChoreBeatingParams {
  groupId: string;
  choreId: number;
  startHour: number;
}

const getJstDateParts = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: getPart("year"),
    month: getPart("month"),
    day: getPart("day"),
  };
};

const buildBeatedAtIso = (startHour: number) => {
  const { year, month, day } = getJstDateParts(new Date());
  const hourText = String(startHour).padStart(2, "0");
  return `${year}-${month}-${day}T${hourText}:00:00+09:00`;
};

export const useCreateChoreBeatingMutation = () => {
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId, choreId, startHour }: CreateChoreBeatingParams) =>
      createChoreBeating({
        groupId,
        chore_id: choreId,
        beated_at: buildBeatedAtIso(startHour),
      }),
    onSuccess: () => {
      closeError();
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message ? error.message : "討伐記録の作成に失敗しました";
      showError({
        title: "討伐エラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
  });
};
