import { useState } from "react";
import { NavLink } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import Modal from "../components/Modal";
import { cancelBooking } from "../utils/bookingUtils";

const TABS = ["Upcoming", "Completed", "Cancelled"];

export default function Bookings({ bookings, refreshBookings, addNotification, showToast }) {
  const [tab, setTab] = useState("Upcoming");
  const [toCancel, setToCancel] = useState(null);
  const [viewing, setViewing] = useState(null);

  const filtered = bookings.filter((b) => b.status === tab);

  function confirmCancel() {
    cancelBooking(toCancel.id);
    refreshBookings();
    addNotification(`Your booking for ${toCancel.workspaceName} has been cancelled.`);
    showToast("Reservation cancelled.", "success");
    setToCancel(null);
  }

  return (
    <div className="page">
      <div className="page-header container">
        <h1>My Bookings</h1>
        <p>Track upcoming reservations and review your booking history.</p>
      </div>

      <div className="container">
        <div className="flex" style={{ gap: 8, marginBottom: 24, borderBottom: "1px solid var(--color-border)" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="btn-ghost"
              style={{
                borderRadius: 0,
                paddingBottom: 12,
                fontWeight: 600,
                color: tab === t ? "var(--color-primary)" : "var(--color-text-muted)",
                borderBottom: tab === t ? "2px solid var(--color-accent)" : "2px solid transparent",
              }}
            >
              {t} ({bookings.filter((b) => b.status === t).length})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No reservations yet.</h3>
            <p>Your next productive day starts with a workspace.</p>
            <NavLink to="/workspaces" className="btn btn-primary">Explore Workspaces</NavLink>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map((b) => (
              <BookingCard key={b.id} booking={b} onCancel={setToCancel} onViewDetails={setViewing} />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!toCancel}
        onClose={() => setToCancel(null)}
        title="Cancel reservation?"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setToCancel(null)}>Keep Booking</button>
            <button className="btn btn-danger" onClick={confirmCancel}>Cancel Reservation</button>
          </>
        }
      >
        <p style={{ margin: 0 }}>Are you sure you want to cancel this reservation? This action cannot be undone.</p>
      </Modal>

      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing?.workspaceName}
        footer={<button className="btn btn-primary" onClick={() => setViewing(null)}>Close</button>}
      >
        {viewing && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
            <div><strong>Booking ID:</strong> {viewing.id}</div>
            <div><strong>Type:</strong> {viewing.workspaceType}</div>
            <div><strong>Date:</strong> {viewing.date}</div>
            <div><strong>Time:</strong> {viewing.startTime} – {viewing.endTime}</div>
            <div><strong>Duration:</strong> {viewing.duration} hour(s)</div>
            <div><strong>Guests:</strong> {viewing.people}</div>
            <div><strong>Status:</strong> {viewing.status}</div>
            <div><strong>Total:</strong> ${viewing.price?.toFixed?.(2)}</div>
            {viewing.notes && <div><strong>Notes:</strong> {viewing.notes}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
}
