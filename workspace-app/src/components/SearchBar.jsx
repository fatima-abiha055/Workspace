import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: "",
    type: "",
    date: "",
    startTime: "",
    endTime: "",
    people: 1,
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    navigate(`/workspaces?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="card search-widget"
      style={{ padding: 22, display: "grid", gap: 14, alignItems: "end" }}
    >
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>Location</label>
        <select value={form.location} onChange={(e) => update("location", e.target.value)}>
          <option value="">Any</option>
          <option>Downtown Hub</option>
          <option>Riverside Campus</option>
          <option>Innovation Park</option>
        </select>
      </div>
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>Space Type</label>
        <select value={form.type} onChange={(e) => update("type", e.target.value)}>
          <option value="">Any</option>
          <option>Hot Desk</option>
          <option>Dedicated Desk</option>
          <option>Private Office</option>
          <option>Meeting Room</option>
        </select>
      </div>
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>Date</label>
        <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
      </div>
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>Start</label>
        <input type="time" value={form.startTime} onChange={(e) => update("startTime", e.target.value)} />
      </div>
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>End</label>
        <input type="time" value={form.endTime} onChange={(e) => update("endTime", e.target.value)} />
      </div>
      <div className="form-group" style={{ margin: 0, gridColumn: "span 1" }}>
        <label>People</label>
        <input
          type="number"
          min="1"
          value={form.people}
          onChange={(e) => update("people", e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ gridColumn: "1 / -1" }}>
        Search Availability
      </button>
    </form>
  );
}
