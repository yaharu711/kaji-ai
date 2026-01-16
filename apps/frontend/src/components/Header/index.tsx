import { Users, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
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
}

function Header({ navItems, groupName }: HeaderProps) {
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
        <div className={styles.userIcon} aria-label="ユーザー">
          <Users size={18} />
        </div>
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
