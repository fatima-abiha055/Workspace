import { useNavigate } from "react-router-dom";

export default function WorkspaceCard({ workspace, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const { id, name, type, capacity, location, amenities, price, rating, available, image } = workspace;

  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img
          src={image}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 220ms ease" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <button
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            fontSize: "1rem",
            color: isFavorite ? "var(--color-danger)" : "var(--color-text-muted)",
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <span
          className={`badge ${available ? "badge-available" : "badge-unavailable"}`}
          style={{ position: "absolute", bottom: 10, left: 10 }}
        >
          {available ? "Available" : "Booked"}
        </span>
      </div>

      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
        <div className="flex-between" style={{ marginBottom: 4 }}>
          <h3 style={{ fontSize: "1.05rem", margin: 0 }}>{name}</h3>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-warning)" }}>★ {rating}</span>
        </div>
        <p style={{ fontSize: "0.85rem", margin: "0 0 8px" }}>
          {type} · Seats {capacity} · {location}
        </p>
        <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
          {amenities.slice(0, 3).map((a) => (
            <span key={a} className="badge badge-neutral">{a}</span>
          ))}
        </div>
        <div className="flex-between" style={{ marginTop: "auto" }}>
          <strong style={{ fontSize: "1.1rem" }}>
            ${price}
            <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>/hr</span>
          </strong>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate(`/workspaces/${id}`)}>
              View Details
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={!available}
              onClick={() => navigate(`/workspaces/${id}`, { state: { autoBook: true } })}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
