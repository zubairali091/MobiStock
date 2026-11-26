import { Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ to = "/", light = false }) {
  return (
    <Link to={to} className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-icon">
        <Smartphone size={18} strokeWidth={2.4} />
      </span>
      <span>MobiStock</span>
    </Link>
  );
}

export default Logo;
