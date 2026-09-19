import { useNavigate } from "react-router-dom";

export default function MeetingRoomCard({ room }) {
  const navigate = useNavigate();
  const { id, name, capacity, price, equipment, available, image } = room;

  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <span
          className={`badge ${available ? "badge-available" : "badge-unavailable"}`}
          style={{ position: "absolute", bottom: 10, left: 10 }}
        >
          {available ? "Available" : "Booked"}
        </span>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontSize: "1.05rem" }}>{name}</h3>
        <p style={{ fontSize: "0.85rem", margin: "0 0 8px" }}>Seats up to {capacity}</p>
        <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
          {equipment.map((e) => (
            <span key={e} className="badge badge-neutral">{e}</span>
          ))}
        </div>
        <div className="flex-between" style={{ marginTop: "auto" }}>
          <strong style={{ fontSize: "1.1rem" }}>
            ${price}
            <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>/hr</span>
          </strong>
          <button
            className="btn btn-primary btn-sm"
            disabled={!available}
            onClick={() => navigate(`/workspaces/${id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
