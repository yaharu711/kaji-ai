import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChoreBeating } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { buildBeatedAtIso, getJstDateString } from "../../../util/datetime";
import { GROUP_BEATINGS_QUERY_KEY } from "./queryKey";

interface CreateChoreBeatingParams {
  groupId: string;
  choreId: number;
  startHour: number;
}

export const useCreateChoreBeatingMutation = () => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId, choreId, startHour }: CreateChoreBeatingParams) =>
      createChoreBeating({
        groupId,
        chore_id: choreId,
        beated_at: buildBeatedAtIso(startHour),
      }),
    onSuccess: async (_data, variables) => {
      // 今日の討伐記録一覧を再取得
      const date = getJstDateString(new Date());
      await queryClient.invalidateQueries({
        queryKey: GROUP_BEATINGS_QUERY_KEY(variables.groupId, date),
      });
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
