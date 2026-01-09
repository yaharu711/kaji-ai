import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { searchGroupUsers } from "../../../api/groups";

export const useSearchGroupUsers = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: ({ groupId, email }: { groupId: string; email: string }) =>
      searchGroupUsers({ groupId, email }),
    onError: (error) => {
      const message =
        error instanceof Error && error.message ? error.message : "検索に失敗しました";
      setErrorMessage(message);
    },
    onSuccess: () => {
      setErrorMessage("");
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
