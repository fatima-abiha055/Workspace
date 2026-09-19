import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = {};
    if (!form.name.trim()) e2.name = "Please complete all required fields.";
    if (!form.email.trim()) e2.email = "Please complete all required fields.";
    else if (!EMAIL_RE.test(form.email)) e2.email = "Please enter a valid email address.";
    if (!form.subject.trim()) e2.subject = "Please complete all required fields.";
    if (!form.message.trim()) e2.message = "Please complete all required fields.";
    setErrors(e2);
    if (Object.keys(e2).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <div className="page">
      <div className="page-header container">
        <div className="eyebrow">Get in touch</div>
        <h1>Contact Us</h1>
        <p>Questions about a workspace or your booking? Send us a message.</p>
      </div>

      <div className="container grid grid-2" style={{ gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
        <div className="card" style={{ padding: 28 }}>
          {sent && (
            <div className="badge badge-available" style={{ marginBottom: 16 }}>
              Message sent! We'll get back to you within one business day.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className={errors.name ? "invalid" : ""} value={form.name} onChange={(e) => update("name", e.target.value)} />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className={errors.email ? "invalid" : ""} value={form.email} onChange={(e) => update("email", e.target.value)} />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" className={errors.subject ? "invalid" : ""} value={form.subject} onChange={(e) => update("subject", e.target.value)} />
              {errors.subject && <div className="field-error">{errors.subject}</div>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" className={errors.message ? "invalid" : ""} value={form.message} onChange={(e) => update("message", e.target.value)} />
              {errors.message && <div className="field-error">{errors.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <Row label="Email" value="hello@workspace.com" />
            <Row label="Phone" value="+1 (555) 010-2030" />
            <Row label="Address" value="120 Market Street, Downtown Hub" />
            <Row label="Opening Hours" value="Mon–Sun, 8:00 AM – 10:00 PM" />
          </div>
          <div
            className="card"
            style={{
              height: 200, display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--color-surface-soft)", color: "var(--color-text-muted)", fontSize: "0.9rem",
            }}
          >
            🗺️ Map preview placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ padding: "8px 0", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
