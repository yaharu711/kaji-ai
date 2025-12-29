import { createContext, useContext } from "react";
import type { AppSessionUser } from "../../../backend/src/types/auth";

const SessionUserContext = createContext<AppSessionUser | null>(null);

interface ProviderProps {
  value: AppSessionUser;
  children: React.ReactNode;
}

export function SessionUserProvider({ value, children }: ProviderProps) {
  return <SessionUserContext.Provider value={value}>{children}</SessionUserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSessionUser() {
  const ctx = useContext(SessionUserContext);
  if (!ctx) {
    throw new Error(
      "SessionUserProvider が見つかりません。認証済みレイアウトでラップしてください。",
    );
  }
  return ctx;
}
