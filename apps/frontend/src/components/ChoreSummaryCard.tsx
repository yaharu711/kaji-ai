import "./ChoreSummaryCard.css";

export interface Highlight {
  label: string;
  value: string;
}

export interface ChoreSummaryCardProps {
  title: string;
  completed: number;
  total: number;
  highlights?: Highlight[];
}

export const ChoreSummaryCard = ({
  title,
  completed,
  total,
  highlights = [],
}: ChoreSummaryCardProps) => {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <article className="chore-card" aria-live="polite">
      <header className="chore-card__header">
        <p className="chore-card__eyebrow">今週の家事</p>
        <h3 className="chore-card__title">{title}</h3>
      </header>

      <div className="chore-card__progress">
        <p id={`chore-progress-${title}`} className="chore-card__progress-label" aria-hidden="true">
          {completed} / {total} 件完了 ({progress}%)
        </p>
        <div
          className="chore-card__progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-labelledby={`chore-progress-${title}`}
        >
          <div className="chore-card__progress-value" style={{ width: `${String(progress)}%` }} />
        </div>
      </div>

      {highlights.length > 0 && (
        <dl className="chore-card__highlights">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="chore-card__highlight">
              <dt>{highlight.label}</dt>
              <dd>{highlight.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
};
