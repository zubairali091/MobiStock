import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Package, Wallet, AlertTriangle, PackageX, Plus, Pencil, Trash2, ArrowRight } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import BrandChart from "../components/BrandChart.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import { LOW_STOCK_LIMIT } from "../utils/constants.js";
import { formatPKR, timeAgo } from "../utils/formatters.js";
import "../styles/dashboard.css";

const activityIcon = { add: Plus, update: Pencil, delete: Trash2 };

function Dashboard() {
  const { products, activity } = useProducts();

  // useMemo: recalculate only when products change
  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, p) => sum + p.purchasePrice * p.quantity, 0);
    const saleValue = products.reduce((sum, p) => sum + p.salePrice * p.quantity, 0);
    const low = products.filter((p) => p.quantity > 0 && p.quantity < LOW_STOCK_LIMIT);
    const out = products.filter((p) => p.quantity === 0);

    // Total units per brand, then the top 5
    const byBrand = {};
    products.forEach((p) => {
      const key = p.brand || "Unknown";
      byBrand[key] = (byBrand[key] || 0) + p.quantity;
    });
    const topBrands = Object.entries(byBrand)
      .map(([brand, units]) => ({ brand, units }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5);

    return { totalValue, saleValue, low, out, topBrands };
  }, [products]);

  return (
    <div className="dashboard">
      <section className="stats-grid">
        <StatCard icon={Package} label="Total products" value={products.length} note="Across all categories" tone="blue" />
        <StatCard icon={Wallet} label="Total stock value" value={formatPKR(stats.totalValue)} note={`${formatPKR(stats.saleValue)} at sale price`} tone="green" />
        <StatCard icon={AlertTriangle} label="Low stock items" value={stats.low.length} note={`Quantity below ${LOW_STOCK_LIMIT}`} tone="amber" />
        <StatCard icon={PackageX} label="Out of stock" value={stats.out.length} note="Quantity zero" tone="red" />
      </section>

      <section className="dash-grid">
        <div className="card">
          <div className="card-head">
            <h2>Top brands</h2>
            <span className="muted">Units in stock</span>
          </div>
          <BrandChart data={stats.topBrands} />
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Recent activity</h2>
          </div>
          {activity.length === 0 ? (
            <p className="muted">No activity yet.</p>
          ) : (
            <ul className="activity-list">
              {activity.slice(0, 6).map((a) => {
                const Icon = activityIcon[a.type] || Pencil;
                return (
                  <li key={a.id}>
                    <span className={`activity-icon act-${a.type}`}><Icon size={15} /></span>
                    <span className="activity-text">{a.text}</span>
                    <span className="activity-time">{timeAgo(a.at)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>Needs restocking</h2>
          <Link to="/app/products" className="link-arrow">
            View products <ArrowRight size={16} />
          </Link>
        </div>
        {stats.low.length + stats.out.length === 0 ? (
          <p className="muted">All products are well stocked.</p>
        ) : (
          <ul className="alert-list">
            {[...stats.out, ...stats.low].slice(0, 6).map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.name}</strong>
                  <span className="cell-sub">{p.brand} · {p.category}</span>
                </div>
                <span className={p.quantity === 0 ? "qty-pill out" : "qty-pill low"}>
                  {p.quantity === 0 ? "Out of stock" : `${p.quantity} left`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
