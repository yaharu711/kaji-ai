import { useState, type ReactNode } from "react";
import ErrorModal from "../ErrorModal";
import { ErrorModalContext, type ErrorModalOptions } from "./context";

interface ErrorModalProviderProps {
  children: ReactNode;
}

function ErrorModalProvider({ children }: ErrorModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState<ReactNode | undefined>(undefined);
  const [actionLabel, setActionLabel] = useState<string | undefined>(undefined);

  const closeError = () => {
    setIsOpen(false);
  };

  const showError = ({ title, message, description, actionLabel }: ErrorModalOptions) => {
    setTitle(title);
    setMessage(message);
    setDescription(description);
    setActionLabel(actionLabel);
    setIsOpen(true);
  };

  const getModalMessage = (status?: number) => {
    if (status === 401) {
      return "認証に失敗しました。再ログインしてください。";
    }
    if (status === 403) {
      return "権限がありません。アクセス権を確認してください。";
    }
    if (status && status >= 500) {
      return "サーバーでエラーが発生しました。時間をおいて再度お試しください。";
    }
    return "予期しないエラーが発生しました。時間をおいて再度お試しください。";
  };

  return (
    <ErrorModalContext.Provider value={{ showError, closeError, getModalMessage }}>
      {children}
      <ErrorModal
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeError();
        }}
        title={title}
        message={message}
        description={description}
        actionLabel={actionLabel}
      />
    </ErrorModalContext.Provider>
  );
}

export default ErrorModalProvider;
