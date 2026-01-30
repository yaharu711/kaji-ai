import { createContext, useContext } from "react";
import type { AppSessionUser } from "@kaiji-ai/backend/contracts";

import type { HeaderNavItem } from "../../components/Header";
import type { GroupMember } from "./UserPopoverContent";

interface GroupLayoutValue {
  groupId: string;
  groupName: string;
  navItems: HeaderNavItem[];
  members?: GroupMember[];
  currentUser: AppSessionUser;
}

const GroupLayoutContext = createContext<GroupLayoutValue | null>(null);

interface ProviderProps {
  value: GroupLayoutValue;
  children: React.ReactNode;
}

export function GroupLayoutProvider({ value, children }: ProviderProps) {
  return <GroupLayoutContext.Provider value={value}>{children}</GroupLayoutContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGroupLayout() {
  const ctx = useContext(GroupLayoutContext);
  if (!ctx) {
    throw new Error(
      "GroupLayoutProvider が見つかりません。グループ配下のレイアウトでラップしてください。",
    );
  }
  return ctx;
}
