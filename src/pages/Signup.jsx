import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthShell from "./AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { validateSignup } from "../utils/validators.js";

function Signup() {
  const { user, signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  if (user) return <Navigate to="/app/dashboard" replace />;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name] || errors.form) setErrors((er) => ({ ...er, [name]: undefined, form: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateSignup(form);
    if (Object.keys(found).length) return setErrors(found);

    const result = signup(form);
    if (!result.ok) return setErrors({ form: result.error });

    showToast("Account created. Welcome to MobiStock!");
    navigate("/app/dashboard", { replace: true });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start managing your shop inventory."
      footer={<>Already have an account? <Link to="/login">Log in</Link></>}
    >
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <div className="form-alert">{errors.form}</div>}

        <label className={`field ${errors.name ? "has-error" : ""}`}>
          <span className="field-label">Full name</span>
          <input name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Ali Raza" />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label className={`field ${errors.email ? "has-error" : ""}`}>
          <span className="field-label">Email</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="ali@example.com" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label className={`field ${errors.password ? "has-error" : ""}`}>
          <span className="field-label">Password</span>
          <div className="input-with-btn">
            <input name="password" type={showPass ? "text" : "password"} autoComplete="new-password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
            <button type="button" className="eye-btn" onClick={() => setShowPass((s) => !s)} aria-label={showPass ? "Hide password" : "Show password"}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        <label className={`field ${errors.confirm ? "has-error" : ""}`}>
          <span className="field-label">Confirm password</span>
          <input name="confirm" type={showPass ? "text" : "password"} autoComplete="new-password" value={form.confirm} onChange={handleChange} placeholder="Re-enter your password" />
          {errors.confirm && <span className="field-error">{errors.confirm}</span>}
        </label>

        <button type="submit" className="btn btn-primary btn-block btn-lg">Create account</button>
      </form>
    </AuthShell>
  );
}

export default Signup;
