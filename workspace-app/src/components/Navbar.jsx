import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationDropdown from "./NotificationDropdown";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/workspaces", label: "Workspaces" },
  { to: "/meeting-rooms", label: "Meeting Rooms" },
  { to: "/bookings", label: "My Bookings" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ loggedIn, user, notifications, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    onLogout();
    setAvatarMenuOpen(false);
    navigate("/");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 300,
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container flex-between" style={{ height: 72 }}>
        <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "var(--color-primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            W
          </span>
          <span style={{ fontWeight: 700, fontSize: "1.15rem" }}>WorkSpace</span>
        </NavLink>

        <nav className="desktop-nav" style={{ display: "flex", gap: 28 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                fontWeight: 600,
                fontSize: "0.92rem",
                color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                borderBottom: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
                paddingBottom: 24,
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="desktop-nav flex-between" style={{ gap: 14 }}>
          <NotificationDropdown notifications={notifications} />
          {loggedIn ? (
            <div style={{ position: "relative" }} ref={avatarRef}>
              <button
                className="btn-ghost"
                onClick={() => setAvatarMenuOpen((o) => !o)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Account menu"
              >
                {(user?.fullName || "U").charAt(0).toUpperCase()}
              </button>
              {avatarMenuOpen && (
                <div
                  className="card"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 10px)",
                    width: 180,
                    padding: 8,
                    zIndex: 200,
                  }}
                >
                  <button
                    className="btn-ghost btn-block"
                    style={{ justifyContent: "flex-start", padding: "8px 10px" }}
                    onClick={() => { setAvatarMenuOpen(false); navigate("/dashboard"); }}
                  >
                    Dashboard
                  </button>
                  <button
                    className="btn-ghost btn-block"
                    style={{ justifyContent: "flex-start", padding: "8px 10px" }}
                    onClick={() => { setAvatarMenuOpen(false); navigate("/profile"); }}
                  >
                    Profile
                  </button>
                  <button
                    className="btn-ghost btn-block"
                    style={{ justifyContent: "flex-start", padding: "8px 10px", color: "var(--color-danger)" }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-outline btn-sm">
              Log In
            </NavLink>
          )}
          <NavLink to="/workspaces" className="btn btn-primary btn-sm">
            Book Now
          </NavLink>
        </div>

        <button
          className="mobile-menu-btn btn-ghost"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ display: "none", fontSize: "1.4rem", padding: 6 }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="mobile-nav"
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMenuOpen(false)} style={{ fontWeight: 600 }}>
              {l.label}
            </NavLink>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            {!loggedIn ? (
              <NavLink to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>
                Log In
              </NavLink>
            ) : (
              <>
                <NavLink to="/dashboard" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ color: "var(--color-danger)" }}
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                >
                  Log Out
                </button>
              </>
            )}
            <NavLink to="/workspaces" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              Book Now
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
