import { Users, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import Popover from "../Popover";
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
  userProfile?: {
    name: string;
    status?: string;
    initial: string;
  };
  householdName?: string;
  members?: Array<{
    id: string;
    name: string;
    initial: string;
    tone?: "pink" | "purple" | "orange";
  }>;
}

const MEMBER_TONE_CLASS = {
  pink: styles.memberTonePink,
  purple: styles.memberTonePurple,
  orange: styles.memberToneOrange,
} as const;

function Header({ navItems, groupName, userProfile, householdName, members }: HeaderProps) {
  const shouldShowUserPopover = userProfile && householdName && members && members.length > 0;

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
        {groupName ? (
          <div className={styles.groupBadgeTop} aria-label="グループ名">
            <span className={styles.groupBadgeText}>{groupName}</span>
          </div>
        ) : null}
        {shouldShowUserPopover ? (
          <Popover
            trigger={
              <button type="button" className={styles.userTrigger} aria-label="ユーザー情報を開く">
                <Users size={18} />
              </button>
            }
            content={
              <div className={styles.userPopoverContent}>
                <div className={styles.userPopoverProfile}>
                  <div className={styles.userPopoverAvatar}>{userProfile.initial}</div>
                  <div className={styles.userPopoverText}>
                    <p className={styles.userPopoverName}>{userProfile.name}</p>
                    {userProfile.status ? (
                      <p className={styles.userPopoverStatus}>{userProfile.status}</p>
                    ) : null}
                  </div>
                </div>
                <div className={styles.userPopoverBody}>
                  <p className={styles.userPopoverSection}>{householdName}のメンバー</p>
                  <ul className={styles.userPopoverMembers}>
                    {members.map((member) => {
                      const toneClass = MEMBER_TONE_CLASS[member.tone ?? "pink"];
                      return (
                        <li key={member.id} className={styles.userPopoverMember}>
                          <span
                            className={[styles.userPopoverMemberAvatar, toneClass]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {member.initial}
                          </span>
                          <span className={styles.userPopoverMemberName}>{member.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            }
            size="md"
            radius="xl"
            variant="soft"
            side="bottom"
            align="end"
          />
        ) : (
          <div className={styles.userIcon} aria-label="ユーザー">
            <Users size={18} />
          </div>
        )}
      </div>
      <div className={styles.bottomRow}>
        {groupName ? (
          <div className={styles.groupBadge} aria-label="グループ名">
            <span className={styles.groupBadgeText}>{groupName}</span>
          </div>
        ) : null}
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
                <Icon size={16} />
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
