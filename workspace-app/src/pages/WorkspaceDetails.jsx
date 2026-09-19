import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import workspaces from "../data/workspaces";
import meetingRooms from "../data/meetingRooms";
import BookingSummary from "../components/BookingSummary";
import { getDurationHours, calculatePrice, formatCurrency } from "../utils/priceCalculator";
import { checkAvailability, saveBooking } from "../utils/bookingUtils";

const ALL_SPACES = [...workspaces, ...meetingRooms];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WorkspaceDetails({ user, addNotification, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const workspace = ALL_SPACES.find((w) => w.id === id);

  const [step, setStep] = useState(location.state?.autoBook ? 2 : 0); // 0 = browsing, 2..4 = wizard
  const [confirmed, setConfirmed] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    people: 1,
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    notes: "",
  });

  const duration = getDurationHours(form.startTime, form.endTime);
  const total = workspace ? calculatePrice(workspace.price, duration) : 0;

  const availability = useMemo(() => {
    if (!workspace || !form.date || !form.startTime || !form.endTime || duration <= 0) return null;
    return checkAvailability(workspace.id, form.date, form.startTime, form.endTime);
  }, [workspace, form.date, form.startTime, form.endTime, duration]);

  if (!workspace) {
    return (
      <div className="page container" style={{ paddingTop: 60 }}>
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <h3>Workspace not found</h3>
          <p>It may have been removed. Browse the full list instead.</p>
          <NavLink to="/workspaces" className="btn btn-primary">Explore Workspaces</NavLink>
        </div>
      </div>
    );
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validateStepTwo() {
    const e = {};
    if (!form.date) e.date = "Please select a date.";
    if (!form.startTime || !form.endTime) e.time = "Please select a valid time range.";
    else if (duration <= 0) e.time = "End time must be after start time.";
    if (form.people < 1) e.people = "Please enter at least 1 guest.";
    if (form.people > workspace.capacity) e.people = `Number of guests cannot exceed capacity (${workspace.capacity}).`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStepThree() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goToStep(next) {
    if (step === 2 && next === 3) {
      if (!validateStepTwo()) return;
      if (availability && !availability.available) return;
    }
    if (step === 3 && next === 4) {
      if (!validateStepThree()) return;
    }
    setErrors({});
    setStep(next);
  }

  function handleConfirm() {
    const booking = saveBooking({
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      workspaceType: workspace.type,
      workspaceImage: workspace.image,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      duration,
      people: Number(form.people),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
      price: total,
    });
    addNotification(`Your booking for ${workspace.name} is confirmed.`);
    showToast("Booking confirmed successfully.", "success");
    setConfirmed(booking);
    setStep(5);
  }

  return (
    <div className="page container" style={{ paddingTop: 40 }}>
      {step === 0 && (
        <DetailsView
          workspace={workspace}
          onStartBooking={() => setStep(2)}
        />
      )}

      {step >= 2 && step <= 4 && (
        <BookingWizard
          step={step}
          workspace={workspace}
          form={form}
          update={update}
          errors={errors}
          duration={duration}
          total={total}
          availability={availability}
          goToStep={goToStep}
          onConfirm={handleConfirm}
          onCancelWizard={() => setStep(0)}
        />
      )}

      {step === 5 && confirmed && (
        <ConfirmationView booking={confirmed} navigate={navigate} />
      )}
    </div>
  );
}

function DetailsView({ workspace, onStartBooking }) {
  return (
    <div className="grid grid-2" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 32, alignItems: "start" }}>
      <div>
        <img src={workspace.image} alt={workspace.name} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, marginBottom: 20 }} />
        <div className="eyebrow">{workspace.type}</div>
        <h1 style={{ fontSize: "1.8rem" }}>{workspace.name}</h1>
        <p style={{ marginBottom: 4 }}>★ {workspace.rating} · {workspace.location}</p>
        <p>{workspace.description}</p>

        <div className="grid grid-3" style={{ margin: "20px 0" }}>
          <InfoBlock label="Capacity" value={`${workspace.capacity} people`} />
          <InfoBlock label="Opening Hours" value={workspace.hours} />
          <InfoBlock label="Price" value={`$${workspace.price}/hr`} />
        </div>

        <h3 style={{ fontSize: "1rem" }}>Amenities</h3>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {workspace.amenities.map((a) => (
            <span key={a} className="badge badge-neutral">{a}</span>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24, position: "sticky", top: 96 }}>
        <span className={`badge ${workspace.available ? "badge-available" : "badge-unavailable"}`} style={{ marginBottom: 12 }}>
          {workspace.available ? "Available — Ready to book" : "Currently unavailable"}
        </span>
        <h3 style={{ fontSize: "1.05rem" }}>Book this space</h3>
        <p style={{ fontSize: "0.9rem" }}>Select a date and time to see live pricing before you confirm.</p>
        <button className="btn btn-primary btn-block" disabled={!workspace.available} onClick={onStartBooking}>
          Start Booking
        </button>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function BookingWizard({ step, workspace, form, update, errors, duration, total, availability, goToStep, onConfirm, onCancelWizard }) {
  const steps = ["Date & Time", "Your Details", "Review"];
  return (
    <div>
      <button className="btn-ghost btn-sm" onClick={onCancelWizard} style={{ marginBottom: 16 }}>← Back to details</button>

      <div className="flex" style={{ gap: 10, marginBottom: 28 }}>
        {steps.map((label, i) => {
          const n = i + 2;
          const active = n === step;
          const done = n < step;
          return (
            <div key={label} className="flex" style={{ alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: done ? "var(--color-accent)" : active ? "var(--color-primary)" : "var(--color-surface-soft)",
                  color: done || active ? "#fff" : "var(--color-text-muted)",
                  fontSize: "0.8rem", fontWeight: 700,
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: active ? 700 : 500, color: active ? "var(--color-text)" : "var(--color-text-muted)" }}>
                {label}
              </span>
              {i < steps.length - 1 && <span style={{ width: 30, height: 1, background: "var(--color-border)" }} />}
            </div>
          );
        })}
      </div>

      <div className="grid grid-2" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "start" }}>
        <div className="card" style={{ padding: 24 }}>
          {step === 2 && (
            <>
              <h3>Select date & time</h3>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className={errors.date ? "invalid" : ""} value={form.date} onChange={(e) => update("date", e.target.value)} />
                {errors.date && <div className="field-error">{errors.date}</div>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input type="time" className={errors.time ? "invalid" : ""} value={form.startTime} onChange={(e) => update("startTime", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input type="time" className={errors.time ? "invalid" : ""} value={form.endTime} onChange={(e) => update("endTime", e.target.value)} />
                </div>
              </div>
              {errors.time && <div className="field-error" style={{ marginTop: -8, marginBottom: 12 }}>{errors.time}</div>}

              <div className="form-group">
                <label>Number of People</label>
                <input type="number" min="1" className={errors.people ? "invalid" : ""} value={form.people} onChange={(e) => update("people", Number(e.target.value))} />
                {errors.people && <div className="field-error">{errors.people}</div>}
              </div>

              {availability && (
                <div className={`badge ${availability.available ? "badge-available" : "badge-unavailable"}`} style={{ marginBottom: 16 }}>
                  {availability.available ? "Available — Ready to book" : "This workspace is unavailable for the selected time."}
                </div>
              )}
              {availability && !availability.available && (
                <p style={{ fontSize: "0.85rem" }}>
                  Try a different time slot, or explore <NavLink to="/workspaces" style={{ color: "var(--color-accent)", fontWeight: 600 }}>another available workspace</NavLink>.
                </p>
              )}

              <button className="btn btn-primary" onClick={() => goToStep(3)} disabled={availability ? !availability.available : false}>
                Continue
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Your details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className={errors.fullName ? "invalid" : ""} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                {errors.fullName && <div className="field-error">{errors.fullName}</div>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className={errors.email ? "invalid" : ""} value={form.email} onChange={(e) => update("email", e.target.value)} />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className={errors.phone ? "invalid" : ""} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea rows="3" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
              </div>
              <div className="flex" style={{ gap: 10 }}>
                <button className="btn btn-outline" onClick={() => goToStep(2)}>Back</button>
                <button className="btn btn-primary" onClick={() => goToStep(4)}>Review Booking</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3>Review your reservation</h3>
              <p>Please confirm everything looks correct before booking.</p>
              <div className="flex" style={{ gap: 10 }}>
                <button className="btn btn-outline" onClick={() => goToStep(3)}>Back</button>
                <button className="btn btn-accent" onClick={onConfirm}>Confirm Reservation</button>
              </div>
            </>
          )}
        </div>

        <BookingSummary
          workspace={workspace}
          date={form.date}
          startTime={form.startTime}
          endTime={form.endTime}
          people={form.people}
          duration={duration}
          total={total}
        />
      </div>
    </div>
  );
}

function ConfirmationView({ booking, navigate }) {
  return (
    <div className="text-center" style={{ maxWidth: 480, margin: "40px auto" }}>
      <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
      <h1>Booking Confirmed!</h1>
      <p>A confirmation has been added to your bookings below.</p>
      <div className="card" style={{ padding: 22, textAlign: "left", margin: "24px 0" }}>
        <Row label="Booking ID" value={booking.id} />
        <Row label="Workspace" value={booking.workspaceName} />
        <Row label="Date" value={booking.date} />
        <Row label="Time" value={`${booking.startTime} – ${booking.endTime}`} />
        <Row label="Duration" value={`${booking.duration} hour(s)`} />
        <Row label="Guests" value={booking.people} />
        <Row label="Total" value={formatCurrency(booking.price)} bold />
      </div>
      <div className="flex" style={{ gap: 12, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => navigate("/bookings")}>View My Bookings</button>
        <button className="btn btn-outline" onClick={() => navigate("/workspaces")}>Book Another Space</button>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex-between" style={{ padding: "6px 0" }}>
      <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 600 }}>{value}</span>
    </div>
  );
}
