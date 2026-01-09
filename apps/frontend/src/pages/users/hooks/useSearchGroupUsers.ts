import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { searchGroupUsers } from "../../../api/groups";
import { ApiError } from "../../../api/errors";
import { useErrorModal } from "../../../components/ErrorModalProvider/useErrorModal";

export const useSearchGroupUsers = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { showError, closeError } = useErrorModal();

  const getModalMessage = (status?: number) => {
    if (status === 401 || status === 403) {
      return "認証に失敗しました。再ログインしてください。";
    }
    if (status && status >= 500) {
      return "サーバーでエラーが発生しました。時間をおいて再度お試しください。";
    }
    return "予期しないエラーが発生しました。時間をおいて再度お試しください。";
  };

  const mutation = useMutation({
    mutationFn: ({ groupId, email }: { groupId: string; email: string }) =>
      searchGroupUsers({ groupId, email }),
    onError: (error) => {
      if (error instanceof ApiError && error.status === 422) {
        setErrorMessage(error.message);
        closeError();
        return;
      }

      const status = error instanceof ApiError ? error.status : undefined;
      const fallbackMessage =
        error instanceof Error && error.message ? error.message : "検索に失敗しました";
      setErrorMessage("");
      showError({
        title: "検索エラー",
        message: status ? getModalMessage(status) : fallbackMessage,
      });
    },
    onSuccess: () => {
      setErrorMessage("");
      closeError();
    },
  });

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const resetSearchResult = () => {
    mutation.reset();
    clearErrorMessage();
  };

  return {
    ...mutation,
    errorMessage,
    clearErrorMessage,
    resetSearchResult,
  };
};
