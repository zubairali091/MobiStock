import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import Logo from "../components/Logo.jsx";
import "../styles/auth.css";

// Shared layout for Login and Signup (side panel + form)
function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <aside className="auth-side">
        <Logo light />
        <div>
          <span className="auth-side-icon"><Smartphone size={30} /></span>
          <h2>Know exactly what is on your shelves.</h2>
          <p>Phones, accessories, glass and spare parts, all tracked from one dashboard.</p>
        </div>
        <small>© {new Date().getFullYear()} MobiStock</small>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <Link to="/" className="auth-back">← Home</Link>
          <h1>{title}</h1>
          <p className="auth-sub">{subtitle}</p>
          {children}
          <p className="auth-footer">{footer}</p>
        </div>
      </main>
    </div>
  );
}

export default AuthShell;
