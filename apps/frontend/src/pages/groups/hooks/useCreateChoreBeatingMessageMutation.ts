import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChoreBeatingMessage } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { GROUP_BEATINGS_QUERY_KEY } from "./queryKey";

interface CreateChoreBeatingMessageParams {
  groupId: string;
  beatingId: number;
  date: string;
  mainMessage: string;
  descriptionMessage: string;
}

export const useCreateChoreBeatingMessageMutation = () => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({
      groupId,
      beatingId,
      mainMessage,
      descriptionMessage,
    }: CreateChoreBeatingMessageParams) =>
      createChoreBeatingMessage({
        groupId,
        beatingId,
        main_message: mainMessage,
        description_message: descriptionMessage.length > 0 ? descriptionMessage : null,
      }),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: GROUP_BEATINGS_QUERY_KEY(variables.groupId, variables.date),
      });
      closeError();
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message
          ? error.message
          : "感謝メッセージの送信に失敗しました";
      showError({
        title: "感謝メッセージ投稿エラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
  });
};
