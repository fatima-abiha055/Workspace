import { formatCurrency } from "../utils/priceCalculator";

const statusStyles = {
  Upcoming: "badge-available",
  Completed: "badge-neutral",
  Cancelled: "badge-unavailable",
};

export default function BookingCard({ booking, onCancel, onViewDetails }) {
  const { id, workspaceName, workspaceImage, workspaceType, date, startTime, endTime, duration, status, price } = booking;

  return (
    <div className="card" style={{ display: "flex", gap: 16, padding: 16, flexWrap: "wrap" }}>
      <img
        src={workspaceImage}
        alt={workspaceName}
        style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 200 }}>
        <div className="flex-between" style={{ flexWrap: "wrap", gap: 8 }}>
          <h3 style={{ fontSize: "1rem", margin: 0 }}>{workspaceName}</h3>
          <span className={`badge ${statusStyles[status] || "badge-neutral"}`}>{status}</span>
        </div>
        <p style={{ fontSize: "0.85rem", margin: "6px 0" }}>
          {workspaceType} · {date} · {startTime}–{endTime} · {duration}h
        </p>
        <p style={{ fontSize: "0.8rem", margin: 0, color: "var(--color-text-muted)" }}>
          Booking ID: {id}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
        <strong>{formatCurrency(price)}</strong>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => onViewDetails(booking)}>
            View Details
          </button>
          {status === "Upcoming" && (
            <button className="btn btn-danger btn-sm" onClick={() => onCancel(booking)}>
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
