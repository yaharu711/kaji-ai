import { BarChart3, ClipboardList, Home, Settings } from "lucide-react";
import type { HeaderNavItem } from "../../components/Header";

export const createGroupNavItems = (groupId: string, activeTo?: string): HeaderNavItem[] => {
  const basePath = `/groups/${groupId}`;
  return [
    { label: "グループ", to: basePath, icon: Home, isActive: activeTo === basePath },
    {
      label: "レポート",
      to: `${basePath}/reports`,
      icon: BarChart3,
      isActive: activeTo === `${basePath}/reports`,
    },
    {
      label: "家事",
      to: `${basePath}/chores`,
      icon: ClipboardList,
      isActive: activeTo === `${basePath}/chores`,
    },
    {
      label: "設定",
      to: `${basePath}/settings`,
      icon: Settings,
      isActive: activeTo === `${basePath}/settings`,
    },
  ];
};
