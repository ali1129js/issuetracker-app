interface Props {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <div className="empty card" role="status">
      <h2 className="empty-title">{title}</h2>
      <p className="empty-body">{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="button button-primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
