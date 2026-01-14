import { Menu } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick?: () => void;
  pageLabel?: string;
}

function Header({ onMenuClick, pageLabel }: HeaderProps) {
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
          {pageLabel ? <span className={styles.pageBadge}>{pageLabel}</span> : null}
        </div>
      </div>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="メニューを開く"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}

export default Header;
