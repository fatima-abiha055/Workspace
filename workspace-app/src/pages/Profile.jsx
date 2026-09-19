import { useState } from "react";
import { updateUser } from "../utils/bookingUtils";

export default function Profile({ user, bookings, refreshUser, showToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    preferredWorkspace: user?.preferredWorkspace || "Hot Desk",
  });

  function save() {
    updateUser(form);
    refreshUser();
    setEditing(false);
    showToast("Profile updated.", "success");
  }

  return (
    <div className="page">
      <div className="page-header container">
        <h1>Profile</h1>
        <p>Manage your account information.</p>
      </div>
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="card" style={{ padding: 28 }}>
          <div className="flex" style={{ gap: 16, alignItems: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "var(--color-accent-soft)", color: "var(--color-accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", fontWeight: 700,
              }}
            >
              {(user?.fullName || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{user?.fullName || "Guest User"}</h3>
              <p style={{ margin: 0 }}>{user?.email}</p>
            </div>
          </div>

          {!editing ? (
            <>
              <Row label="Full Name" value={user?.fullName} />
              <Row label="Email" value={user?.email} />
              <Row label="Phone" value={user?.phone} />
              <Row label="Preferred Workspace" value={user?.preferredWorkspace || "Not set"} />
              <Row label="Total Bookings" value={bookings.length} />
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Preferred Workspace</label>
                <select value={form.preferredWorkspace} onChange={(e) => setForm((f) => ({ ...f, preferredWorkspace: e.target.value }))}>
                  <option>Hot Desk</option>
                  <option>Dedicated Desk</option>
                  <option>Private Office</option>
                  <option>Meeting Room</option>
                </select>
              </div>
              <div className="flex" style={{ gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={save}>Save Changes</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--color-border)" }}>
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value || "—"}</span>
    </div>
  );
}
