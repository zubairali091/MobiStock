import { Link } from "react-router-dom";
import { Boxes, BellRing, BarChart3, Search, ScanLine, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "../components/Logo.jsx";
import "../styles/landing.css";

const features = [
  { icon: Boxes, title: "Every category in one place", text: "Mobiles, accessories, tempered glass and spare parts, all in a single stock list." },
  { icon: BellRing, title: "Low stock alert", text: "Products below 5 units are flagged automatically, so you can reorder before you run out." },
  { icon: ScanLine, title: "IMEI tracking", text: "Store the 15-digit IMEI of every phone and avoid wrong or duplicate entries." },
  { icon: Search, title: "Instant search and filters", text: "Find any product in seconds by name, brand, model, IMEI, category or stock status." },
  { icon: BarChart3, title: "Dashboard", text: "See total stock value, top brands and recent activity on one screen." },
  { icon: ShieldCheck, title: "Private by default", text: "Your inventory is only visible after you log in." },
];

const preview = [
  { name: "Galaxy A15", sub: "Samsung · 6GB/128GB", qty: 8, status: "In Stock", cls: "in" },
  { name: "Redmi Note 13", sub: "Xiaomi · 8GB/256GB", qty: 3, status: "Low Stock", cls: "low" },
  { name: "Spark 20 Pro", sub: "Tecno · 8GB/256GB", qty: 0, status: "Out of Stock", cls: "out" },
  { name: "20W Fast Charger", sub: "Samsung · White", qty: 25, status: "In Stock", cls: "in" },
];

function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <nav className="landing-nav-links">
          <a href="#features">Features</a>
        </nav>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/signup" className="btn btn-primary">Sign up</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Your entire shop stock, on one screen.</h1>
          <p>
            MobiStock is built for mobile shops. Track phones, chargers, glass and spare parts,
            spot low stock early, and see every amount in PKR.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-light btn-lg">Login</Link>
          </div>
        </div>

        {/* Small preview that looks like the real app */}
        <div className="hero-preview" aria-hidden="true">
          <div className="preview-head">
            <strong>Today&apos;s stock</strong>
            <span>4 items</span>
          </div>
          {preview.map((p) => (
            <div className="preview-row" key={p.name}>
              <div>
                <div className="preview-name">{p.name}</div>
                <div className="preview-sub">{p.sub}</div>
              </div>
              <div className="preview-qty">{p.qty}</div>
              <span className={`badge badge-${p.cls}`}>
                <span className="badge-dot" />
                {p.status}
              </span>
            </div>
          ))}
          <div className="preview-foot">
            <span>Total stock value</span>
            <strong>Rs 1,284,500</strong>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Built around how mobile shops actually work</h2>
        <p className="features-sub">Not generic inventory software. Made for phones, accessories and spare parts.</p>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature" key={title}>
              <span className="feature-icon"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Get your stock under control today</h2>
        <p>Creating an account is free and takes under a minute.</p>
        <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
      </section>

      <footer className="landing-footer">
        <Logo />
        <span>© {new Date().getFullYear()} MobiStock</span>
      </footer>
    </div>
  );
}

export default Landing;
