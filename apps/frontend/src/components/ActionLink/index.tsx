import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./ActionLink.module.css";

interface ActionLinkProps {
  to: string;
  icon?: ReactNode;
  pageName: string;
}

function ActionLink({ to, icon, pageName }: ActionLinkProps) {
  return (
    <Link to={to} className={styles.actionLink}>
      {icon}
      {`${pageName}に移動`}
    </Link>
  );
}

export default ActionLink;
