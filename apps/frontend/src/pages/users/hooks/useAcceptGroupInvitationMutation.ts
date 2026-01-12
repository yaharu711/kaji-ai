import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptGroupInvitation } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { GROUPS_QUERY_KEY } from "./queryKeys";

export const useAcceptGroupInvitationMutation = () => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId }: { groupId: string }) => acceptGroupInvitation({ groupId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEY });
      closeError();
    },
    onError: (error) => {
      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message ? error.message : "招待の承認に失敗しました";
      showError({
        title: "招待承認エラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
  });
};
