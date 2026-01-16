import { BarChart3, ClipboardList, Home, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "ホーム", to: "/users", icon: Home },
  { label: "レポート", to: "/users/report", icon: BarChart3 },
  { label: "家事", to: "/users/chores", icon: ClipboardList },
  { label: "設定", to: "/users/settings", icon: Settings },
] as const;

function Header() {
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
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [styles.navItem, isActive ? styles.navItemActive : ""].filter(Boolean).join(" ")
              }
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
