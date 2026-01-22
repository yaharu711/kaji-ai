import { BarChart3, ClipboardList, Home, Settings } from "lucide-react";
import type { HeaderNavItem } from "../../components/Header";

export const createGroupNavItems = (
  groupId: string,
  groupName: string,
  activeTo?: string,
): HeaderNavItem[] => {
  const basePath = `/groups/${groupId}`;
  const state = { groupName };
  return [
    { label: "ホーム", to: basePath, icon: Home, isActive: activeTo === basePath, state },
    {
      label: "レポート",
      to: `${basePath}/reports`,
      icon: BarChart3,
      isActive: activeTo === `${basePath}/reports`,
      state,
    },
    {
      label: "家事",
      to: `${basePath}/chores`,
      icon: ClipboardList,
      isActive: activeTo === `${basePath}/chores`,
      state,
    },
    {
      label: "設定",
      to: `${basePath}/settings`,
      icon: Settings,
      isActive: activeTo === `${basePath}/settings`,
      state,
    },
  ];
};
