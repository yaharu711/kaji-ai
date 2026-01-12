import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptGroupInvitation } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";
import { GROUPS_QUERY_KEY } from "./queryKeys";

interface AcceptGroupInvitationVariables {
  groupId: string;
}

interface UseAcceptGroupInvitationMutationOptions {
  onSuccess?: (groupId: string) => void;
}

export const useAcceptGroupInvitationMutation = (
  options?: UseAcceptGroupInvitationMutationOptions,
) => {
  const queryClient = useQueryClient();
  const { showError, closeError, getModalMessage } = useErrorModal();

  return useMutation({
    mutationFn: ({ groupId }: AcceptGroupInvitationVariables) => acceptGroupInvitation({ groupId }),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEY });
      closeError();
      options?.onSuccess?.(variables.groupId);
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
