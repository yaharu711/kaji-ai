import { Users, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { AppSessionUser } from "@kaiji-ai/backend/contracts";
import Popover from "../Popover";
import UserPopoverContent, { type GroupMember } from "./UserPopoverContent";
import styles from "./Header.module.css";

export interface HeaderNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  isActive?: boolean;
}

interface HeaderProps {
  navItems: HeaderNavItem[];
  groupName?: string;
  currentUser?: AppSessionUser;
  members?: GroupMember[];
}

function Header({ navItems, groupName, currentUser, members }: HeaderProps) {
  const popoverContent =
    groupName && currentUser && members && members.length > 0 ? (
      <UserPopoverContent groupName={groupName} currentUser={currentUser} members={members} />
    ) : null;
  const shouldShowUserPopover = Boolean(popoverContent);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <span className={styles.iconWrap}>
            <img
              src="https://kaji-ai.s3.ap-northeast-1.amazonaws.com/favicon.svg"
              alt="アプリのアイコン"
            />
          </span>
          <div className={styles.brandText}>
            <span className={styles.appName}>カジアイ</span>
          </div>
        </div>
        <Popover
          trigger={
            <button
              type="button"
              className={styles.userTrigger}
              aria-label="ユーザー情報を開く"
              disabled={!shouldShowUserPopover}
            >
              <Users size={18} />
            </button>
          }
          ariaLabel="ユーザー情報"
          content={popoverContent}
          size="md"
          radius="xl"
          variant="soft"
          side="bottom"
          align="end"
        />
      </div>
      <div className={styles.bottomRow}>
        <nav className={styles.nav} aria-label="ページナビゲーション">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [styles.navItem, (item.isActive ?? isActive) ? styles.navItemActive : ""]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
