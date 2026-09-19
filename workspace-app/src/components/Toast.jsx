export default function Toast({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type || ""}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
