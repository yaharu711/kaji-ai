import { type ReactNode } from "react";
import { Users, type LucideIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import type { AppSessionUser } from "@kaiji-ai/backend/contracts";
import Popover from "../Popover";
import UserPopoverContent, { type GroupMember } from "./UserPopoverContent";
import styles from "./Header.module.css";

export interface HeaderNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  isActive?: boolean;
  state?: unknown;
}

interface HeaderProps {
  navItems: HeaderNavItem[];
  groupName?: string;
  currentUser?: AppSessionUser;
  members?: GroupMember[];
  userAction?: ReactNode;
}

function Header({ navItems, groupName, currentUser, members, userAction }: HeaderProps) {
  const popoverContent =
    groupName && currentUser && members && members.length > 0 ? (
      <UserPopoverContent groupName={groupName} currentUser={currentUser} members={members} />
    ) : null;
  const shouldShowUserPopover = Boolean(popoverContent);
  const actionNode = userAction ? (
    <div className={styles.userAction}>{userAction}</div>
  ) : (
    <Popover
      trigger={
        <button
          type="button"
          className={styles.userTrigger}
          aria-label="ユーザー情報を開く"
          disabled={!shouldShowUserPopover}
        >
          <Users size={18} />
          <span>メンバー</span>
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
  );

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <Link className={styles.brand} to="/" aria-label="トップページへ戻る">
          <span className={styles.iconWrap}>
            <img
              src="https://kaji-ai.s3.ap-northeast-1.amazonaws.com/favicon.svg"
              alt="アプリのアイコン"
            />
          </span>
          <div className={styles.brandText}>
            <span className={styles.appName}>カジアイ</span>
          </div>
        </Link>
        {actionNode}
      </div>
      <div className={styles.bottomRow}>
        <nav className={styles.nav} aria-label="ページナビゲーション">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                state={item.state}
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
