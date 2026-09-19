import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WorkspaceCard from "../components/WorkspaceCard";
import workspaces from "../data/workspaces";
import meetingRooms from "../data/meetingRooms";

export default function Home({ favorites, onToggleFavorite }) {
  const featured = [...workspaces.slice(0, 3), meetingRooms[1]];

  return (
    <div className="page">
      <section
        style={{
          background: "linear-gradient(180deg, #F3F6F4 0%, var(--color-bg) 100%)",
          paddingTop: 64,
          paddingBottom: 90,
        }}
      >
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <div>
              <div className="eyebrow">Coworking, reimagined</div>
              <h1 style={{ fontSize: "2.75rem", lineHeight: 1.1 }}>
                Your perfect workspace is just a booking away.
              </h1>
              <p style={{ fontSize: "1.05rem", maxWidth: 480 }}>
                Discover flexible desks, private offices and meeting rooms across the city.
                Book in seconds, manage every reservation in one place.
              </p>
              <div className="flex flex-wrap" style={{ gap: 14 }}>
                <NavLink to="/workspaces" className="btn btn-primary">Explore Workspaces</NavLink>
                <NavLink to="/workspaces" className="btn btn-outline">Book a Space</NavLink>
              </div>
            </div>
            <div className="grid grid-2" style={{ gap: 14 }}>
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
                alt="Modern coworking desk area"
                style={{ borderRadius: 16, height: 220, objectFit: "cover", gridColumn: "1 / -1" }}
              />
              <img
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=400&q=80"
                alt="Meeting room"
                style={{ borderRadius: 16, height: 140, objectFit: "cover" }}
              />
              <img
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=400&q=80"
                alt="Private office"
                style={{ borderRadius: 16, height: 140, objectFit: "cover" }}
              />
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex-between" style={{ flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <div>
              <div className="eyebrow">Featured spaces</div>
              <h2 style={{ fontSize: "1.7rem", margin: 0 }}>Find a workspace that fits your day.</h2>
            </div>
            <NavLink to="/workspaces" className="btn btn-outline btn-sm">View all workspaces</NavLink>
          </div>
          <div className="grid grid-4">
            {featured.map((w) => (
              <WorkspaceCard
                key={w.id}
                workspace={w}
                isFavorite={favorites.includes(w.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid grid-4" style={{ textAlign: "center" }}>
          <Stat number="25+" label="Workspaces" />
          <Stat number="10+" label="Meeting Rooms" />
          <Stat number="500+" label="Members" />
          <Stat number="24/7" label="Support" />
        </div>
      </section>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-primary)" }}>{number}</div>
      <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>{label}</div>
    </div>
  );
}
