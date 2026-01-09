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

  return (
    <ErrorModalContext.Provider value={{ showError, closeError }}>
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
