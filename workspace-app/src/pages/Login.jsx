import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { saveUser, getUser } from "../utils/bookingUtils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onLogin, showToast }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = {};
    if (!EMAIL_RE.test(form.email)) e2.email = "Please enter a valid email address.";
    if (!form.password) e2.password = "Please complete all required fields.";
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    const existing = getUser();
    const user = existing?.email === form.email ? existing : saveUser({ fullName: existing?.fullName || "Demo User", email: form.email });
    saveUser(user);
    onLogin();
    showToast("Welcome back!", "success");
    navigate("/dashboard");
  }

  return (
    <div className="page container" style={{ maxWidth: 420, paddingTop: 64 }}>
      <div className="text-center" style={{ marginBottom: 24 }}>
        <h1>Log In</h1>
        <p>Welcome back to WorkSpace.</p>
      </div>
      <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className={errors.email ? "invalid" : ""} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className={errors.password ? "invalid" : ""} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem" }}>
          Don't have an account? <NavLink to="/signup" style={{ color: "var(--color-accent)", fontWeight: 600 }}>Sign up</NavLink>
        </p>
      </form>
    </div>
  );
}
