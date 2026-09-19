const TYPES = ["Hot Desk", "Dedicated Desk", "Private Office", "Meeting Room"];
const AMENITIES = ["Wi-Fi", "Air Conditioning", "Power Outlets", "Whiteboard", "Projector", "Coffee", "Parking", "Printer"];

export default function FilterSidebar({ filters, setFilters, onClose }) {
  function toggleType(type) {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type) ? f.types.filter((t) => t !== type) : [...f.types, type],
    }));
  }

  function toggleAmenity(a) {
    setFilters((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  }

  function reset() {
    setFilters({
      types: [],
      amenities: [],
      maxPrice: 50,
      minCapacity: 1,
      onlyAvailable: false,
    });
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: "1rem" }}>Filters</h3>
        <button className="btn-ghost btn-sm" onClick={reset} style={{ fontSize: "0.8rem" }}>
          Reset
        </button>
        {onClose && (
          <button className="btn-ghost btn-sm" onClick={onClose} aria-label="Close filters">✕</button>
        )}
      </div>

      <div className="form-group">
        <label>Workspace Type</label>
        {TYPES.map((t) => (
          <label key={t} style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 400, marginBottom: 6, fontSize: "0.9rem" }}>
            <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleType(t)} style={{ width: "auto" }} />
            {t}
          </label>
        ))}
      </div>

      <div className="form-group">
        <label>Minimum Capacity</label>
        <input
          type="number"
          min="1"
          value={filters.minCapacity}
          onChange={(e) => setFilters((f) => ({ ...f, minCapacity: Number(e.target.value) || 1 }))}
        />
      </div>

      <div className="form-group">
        <label>Max Price: ${filters.maxPrice}/hr</label>
        <input
          type="range"
          min="5"
          max="50"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          style={{ width: "100%" }}
        />
      </div>

      <div className="form-group">
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            style={{ width: "auto" }}
            checked={filters.onlyAvailable}
            onChange={(e) => setFilters((f) => ({ ...f, onlyAvailable: e.target.checked }))}
          />
          Only show available
        </label>
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Amenities</label>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {AMENITIES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAmenity(a)}
              className="btn-sm"
              style={{
                borderRadius: 999,
                border: "1.5px solid var(--color-border)",
                background: filters.amenities.includes(a) ? "var(--color-accent-soft)" : "transparent",
                color: filters.amenities.includes(a) ? "var(--color-accent)" : "var(--color-text-muted)",
                borderColor: filters.amenities.includes(a) ? "var(--color-accent)" : "var(--color-border)",
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
