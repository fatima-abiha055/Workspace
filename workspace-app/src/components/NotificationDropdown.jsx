import { useState, useRef, useEffect } from "react";

export default function NotificationDropdown({ notifications }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        className="btn-ghost icon-btn"
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        style={{ position: "relative", padding: 8, borderRadius: 8, background: "transparent", fontSize: "1.1rem" }}
      >
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-danger)",
            }}
          />
        )}
      </button>
      {open && (
        <div
          className="card"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            width: 300,
            padding: 12,
            zIndex: 200,
          }}
        >
          <div className="flex-between" style={{ marginBottom: 8 }}>
            <strong style={{ fontSize: "0.9rem" }}>Notifications</strong>
          </div>
          {notifications.length === 0 ? (
            <p style={{ fontSize: "0.85rem", margin: 0 }}>No notifications yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 260, overflowY: "auto" }}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    fontSize: "0.85rem",
                    padding: "8px 10px",
                    background: "var(--color-surface-soft)",
                    borderRadius: 8,
                  }}
                >
                  {n.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
