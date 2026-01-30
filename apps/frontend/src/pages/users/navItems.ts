import { CircleUser, Home } from "lucide-react";
import type { HeaderNavItem } from "../../components/Header";

export const createUserNavItems = (userId: string, activeTo?: string): HeaderNavItem[] => {
  const basePath = `/users/${userId}`;
  return [
    { label: "ホーム", to: basePath, icon: Home, isActive: activeTo === basePath },
    {
      label: "プロフィール",
      to: `${basePath}/profile`,
      icon: CircleUser,
      isActive: activeTo === `${basePath}/profile`,
    },
  ];
};
