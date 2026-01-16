import { type LucideIcon } from "lucide-react";
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
}

function Header({ navItems }: HeaderProps) {
  return (
    <header className={styles.header}>
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
      <nav className={styles.nav} aria-label="ページナビゲーション">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={[styles.navItem, item.isActive ? styles.navItemActive : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
