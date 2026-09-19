import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-primary)", color: "#E5E9EF", marginTop: "auto" }}>
      <div className="container" style={{ padding: "56px 24px 28px" }}>
        <div className="grid grid-4" style={{ gap: 32 }}>
          <div>
            <div className="flex" style={{ alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "#fff",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                W
              </span>
              <strong>WorkSpace</strong>
            </div>
            <p style={{ color: "#AEB8C4", fontSize: "0.9rem" }}>
              Find your space. Focus on your work.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>Explore</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
              <NavLink to="/workspaces" style={{ color: "#AEB8C4" }}>Workspaces</NavLink>
              <NavLink to="/meeting-rooms" style={{ color: "#AEB8C4" }}>Meeting Rooms</NavLink>
              <NavLink to="/bookings" style={{ color: "#AEB8C4" }}>My Bookings</NavLink>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
              <NavLink to="/about" style={{ color: "#AEB8C4" }}>About</NavLink>
              <NavLink to="/contact" style={{ color: "#AEB8C4" }}>Contact</NavLink>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>Contact</h4>
            <p style={{ color: "#AEB8C4", fontSize: "0.9rem", marginBottom: 4 }}>hello@workspace.com</p>
            <p style={{ color: "#AEB8C4", fontSize: "0.9rem" }}>+1 (555) 010-2030</p>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            marginTop: 32,
            paddingTop: 20,
            fontSize: "0.8rem",
            color: "#8896A6",
          }}
        >
          © {new Date().getFullYear()} WorkSpace. All rights reserved. Demo project — no real payments are processed.
        </div>
      </div>
    </footer>
  );
}
