import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChoreBeatingLike } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { GROUP_BEATINGS_QUERY_KEY } from "./queryKey";

interface CreateChoreBeatingLikeParams {
  groupId: string;
  beatingId: number;
  date: string;
}

export const useCreateChoreBeatingLikeMutation = () => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId, beatingId }: CreateChoreBeatingLikeParams) =>
      createChoreBeatingLike({ groupId, beatingId }),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: GROUP_BEATINGS_QUERY_KEY(variables.groupId, variables.date),
      });
      closeError();
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message ? error.message : "いいねの送信に失敗しました";
      showError({
        title: "いいねエラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
  });
};
