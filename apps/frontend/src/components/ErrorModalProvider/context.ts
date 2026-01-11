import { createContext, type ReactNode } from "react";

export interface ErrorModalOptions {
  title?: string;
  message: string;
  description?: ReactNode;
  actionLabel?: string;
}

export interface ErrorModalContextValue {
  showError: (options: ErrorModalOptions) => void;
  closeError: () => void;
  getModalMessage: (status?: number) => string;
}

export const ErrorModalContext = createContext<ErrorModalContextValue | undefined>(undefined);
