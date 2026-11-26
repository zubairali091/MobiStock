import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthShell from "./AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { validateLogin } from "../utils/validators.js";

function Login() {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/app/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  // Already logged in: skip the login page
  if (user) return <Navigate to="/app/dashboard" replace />;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name] || errors.form) setErrors((er) => ({ ...er, [name]: undefined, form: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateLogin(form);
    if (Object.keys(found).length) return setErrors(found);

    const result = login(form);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    showToast("Welcome back!");
    navigate(redirectTo, { replace: true });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your account."
      footer={<>Don't have an account? <Link to="/signup">Sign up</Link></>}
    >
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <div className="form-alert">{errors.form}</div>}

        <label className={`field ${errors.email ? "has-error" : ""}`}>
          <span className="field-label">Email</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="ali@example.com" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label className={`field ${errors.password ? "has-error" : ""}`}>
          <span className="field-label">Password</span>
          <div className="input-with-btn">
            <input name="password" type={showPass ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={handleChange} placeholder="Your password" />
            <button type="button" className="eye-btn" onClick={() => setShowPass((s) => !s)} aria-label={showPass ? "Hide password" : "Show password"}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        <button type="submit" className="btn btn-primary btn-block btn-lg">Login</button>
      </form>
    </AuthShell>
  );
}

export default Login;
