import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { saveUser } from "../utils/bookingUtils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup({ onLogin, showToast }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = {};
    if (!form.fullName.trim()) e2.fullName = "Please complete all required fields.";
    if (!EMAIL_RE.test(form.email)) e2.email = "Please enter a valid email address.";
    if (form.password.length < 6) e2.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) e2.confirmPassword = "Passwords do not match.";
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    saveUser({ fullName: form.fullName, email: form.email });
    onLogin();
    showToast("Account created — welcome to WorkSpace!", "success");
    navigate("/dashboard");
  }

  return (
    <div className="page container" style={{ maxWidth: 420, paddingTop: 64 }}>
      <div className="text-center" style={{ marginBottom: 24 }}>
        <h1>Create Account</h1>
        <p>Join WorkSpace to start booking.</p>
      </div>
      <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className={errors.fullName ? "invalid" : ""} value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className={errors.confirmPassword ? "invalid" : ""} value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} />
          {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem" }}>
          Already have an account? <NavLink to="/login" style={{ color: "var(--color-accent)", fontWeight: 600 }}>Log in</NavLink>
        </p>
      </form>
    </div>
  );
}
