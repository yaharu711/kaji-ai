import { useContext } from "react";
import { ErrorModalContext } from "./context";

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error("useErrorModal must be used within ErrorModalProvider");
  }
  return context;
};
