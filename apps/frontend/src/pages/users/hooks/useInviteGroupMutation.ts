import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inviteGroupUser } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { GROUPS_QUERY_KEY } from "./queryKeys";

export const useInviteGroupMutation = () => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: string }) =>
      inviteGroupUser({ groupId, user_id: userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEY });
      closeError();
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message ? error.message : "ユーザー招待に失敗しました";
      showError({
        title: "招待エラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
  });
};
