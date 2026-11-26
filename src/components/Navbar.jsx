import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const titles = {
  "/app/dashboard": "Dashboard",
  "/app/products": "Products",
};

function Navbar({ onMenu }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <div className="topbar-title">
        <h1>{titles[pathname] || "MobiStock"}</h1>
        <span>{today}</span>
      </div>
      <div className="topbar-user">
        <span className="avatar">{user?.name?.charAt(0).toUpperCase()}</span>
        <span className="topbar-name">{user?.name}</span>
      </div>
    </header>
  );
}

export default Navbar;
