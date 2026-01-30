import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
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
  userAction?: ReactNode;
}

function Header({ navItems, userAction }: HeaderProps) {
  const actionNode = userAction ? <div className={styles.userAction}>{userAction}</div> : null;

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
