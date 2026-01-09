import { Check, UserPlus } from "lucide-react";
import type { SearchUser } from "@kaiji-ai/backend/contracts";
import Button from "../../../../components/Button";
import styles from "./search-result-list.module.css";

interface SearchResultListProps {
  results: SearchUser[];
  onInvite?: (user: SearchUser) => void;
}

function SearchResultList({ results, onInvite }: SearchResultListProps) {
  const handleInvite = (user: SearchUser) => {
    if (!onInvite) return;
    onInvite(user);
  };

  const formatCountLabel = (count: number) =>
    `${count.toLocaleString()}件のユーザーが見つかりました`;

  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.trim().charAt(0);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.resultCount}>{formatCountLabel(results.length)}</p>

      <ul className={styles.list}>
        {results.map((user) => {
          const isUnavailable = user.is_invited_or_belonging;

          const { label, disabled, icon, variant } = (() => {
            if (isUnavailable) {
              return {
                label: "参加/招待済み",
                disabled: true,
                icon: <Check size={18} strokeWidth={2.2} />,
                variant: "secondary" as const,
              };
            }
            return {
              label: "招待",
              disabled: false,
              icon: <UserPlus size={18} strokeWidth={2.2} />,
              variant: "primary" as const,
            };
          })();

          return (
            <li key={user.id} className={styles.card}>
              <div className={styles.avatar} aria-hidden="true">
                <span className={styles.avatarInitial}>{getInitial(user.name ?? "")}</span>
              </div>
              <div className={styles.meta}>
                <p className={styles.name}>{user.name ?? ""}</p>
                <p className={styles.email}>{user.email ?? ""}</p>
              </div>
              <Button
                size="md"
                radius="pill"
                variant={variant}
                icon={icon}
                onClick={() => {
                  handleInvite(user);
                }}
                disabled={disabled}
              >
                {label}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResultList;
