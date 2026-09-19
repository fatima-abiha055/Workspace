export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        <div>{children}</div>
        {footer && (
          <div className="flex flex-wrap" style={{ gap: 12, marginTop: 20 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
