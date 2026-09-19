import { NavLink } from "react-router-dom";
import workspaces from "../data/workspaces";
import meetingRooms from "../data/meetingRooms";
import WorkspaceCard from "../components/WorkspaceCard";
import { formatCurrency } from "../utils/priceCalculator";

const ALL_SPACES = [...workspaces, ...meetingRooms];

export default function Dashboard({ user, bookings, favorites, onToggleFavorite }) {
  const upcoming = bookings.filter((b) => b.status === "Upcoming");
  const completed = bookings.filter((b) => b.status === "Completed");
  const nextBooking = upcoming[0];
  const hoursBooked = bookings.reduce((sum, b) => sum + (b.duration || 0), 0);
  const favoriteSpaces = ALL_SPACES.filter((w) => favorites.includes(w.id));

  return (
    <div className="page">
      <div className="page-header container">
        <h1>Good morning, {user?.fullName?.split(" ")[0] || "there"}</h1>
        <p>Here's a snapshot of your WorkSpace activity.</p>
      </div>

      <div className="container">
        <div className="grid grid-4" style={{ marginBottom: 32 }}>
          <SummaryCard label="Upcoming Bookings" value={upcoming.length} />
          <SummaryCard label="Hours Booked" value={hoursBooked} />
          <SummaryCard label="Favorite Spaces" value={favoriteSpaces.length} />
          <SummaryCard label="Completed Bookings" value={completed.length} />
        </div>

        <div className="grid grid-2" style={{ gridTemplateColumns: "1.3fr 1fr", gap: 24, marginBottom: 32 }}>
          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: "1rem" }}>Upcoming Reservation</h3>
            {nextBooking ? (
              <div className="flex" style={{ gap: 14 }}>
                <img src={nextBooking.workspaceImage} alt="" style={{ width: 96, height: 76, objectFit: "cover", borderRadius: 10 }} />
                <div>
                  <strong>{nextBooking.workspaceName}</strong>
                  <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
                    {nextBooking.date} · {nextBooking.startTime}–{nextBooking.endTime}
                  </p>
                  <span className="badge badge-available">{formatCurrency(nextBooking.price)}</span>
                </div>
              </div>
            ) : (
              <p>No upcoming reservations. Time to book your next session!</p>
            )}
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h3 style={{ fontSize: "1rem" }}>Quick Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <NavLink to="/workspaces" className="btn btn-primary btn-block">Book a Desk</NavLink>
              <NavLink to="/meeting-rooms" className="btn btn-outline btn-block">Book Meeting Room</NavLink>
              <NavLink to="/bookings" className="btn btn-ghost btn-block">View Reservations</NavLink>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>Recent Bookings</h3>
        {bookings.length === 0 ? (
          <p style={{ marginBottom: 32 }}>No booking history yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="card flex-between" style={{ padding: 14 }}>
                <span>{b.workspaceName} · {b.date}</span>
                <span className="badge badge-neutral">{b.status}</span>
              </div>
            ))}
          </div>
        )}

        <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>Favorite Workspaces</h3>
        {favoriteSpaces.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♡</div>
            <h3>No favorites yet</h3>
            <p>Tap the heart icon on any workspace to save it here.</p>
            <NavLink to="/workspaces" className="btn btn-primary">Explore Workspaces</NavLink>
          </div>
        ) : (
          <div className="grid grid-4">
            {favoriteSpaces.map((w) => (
              <WorkspaceCard key={w.id} workspace={w} isFavorite={true} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-primary)" }}>{value}</div>
      <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{label}</div>
    </div>
  );
}
