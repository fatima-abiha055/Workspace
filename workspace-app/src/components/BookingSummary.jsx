import { formatCurrency } from "../utils/priceCalculator";

export default function BookingSummary({ workspace, date, startTime, endTime, people, duration, total }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: "1rem" }}>Booking Summary</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
        <Row label="Workspace" value={workspace?.name || "—"} />
        <Row label="Date" value={date || "Not selected"} />
        <Row label="Time" value={startTime && endTime ? `${startTime} – ${endTime}` : "Not selected"} />
        <Row label="Duration" value={duration ? `${duration} hour(s)` : "—"} />
        <Row label="Guests" value={people || "—"} />
      </div>
      <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid var(--color-border)" }} />
      <div className="flex-between">
        <strong>Estimated Total</strong>
        <strong style={{ fontSize: "1.2rem", color: "var(--color-primary)" }}>{formatCurrency(total || 0)}</strong>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex-between">
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}
