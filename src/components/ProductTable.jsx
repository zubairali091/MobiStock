import { Pencil, Trash2, PackageSearch } from "lucide-react";
import StockBadge from "./StockBadge.jsx";
import { formatPKR } from "../utils/formatters.js";

function ProductTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <PackageSearch size={40} />
        <h3>No products found</h3>
        <p>Try a different search or filter, or add a new product.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Details</th>
            <th className="num">Purchase</th>
            <th className="num">Sale</th>
            <th className="num">Qty</th>
            <th>Status</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td data-label="Product">
                <div className="cell-title">{p.name}</div>
                <div className="cell-sub">{p.brand}{p.model ? ` · ${p.model}` : ""}</div>
              </td>
              <td data-label="Category">{p.category}</td>
              <td data-label="Details">
                <div>{[p.ramStorage, p.color].filter(Boolean).join(" · ") || "—"}</div>
                {p.imei && <div className="cell-sub mono">IMEI {p.imei}</div>}
              </td>
              <td data-label="Purchase" className="num">{formatPKR(p.purchasePrice)}</td>
              <td data-label="Sale" className="num">{formatPKR(p.salePrice)}</td>
              <td data-label="Qty" className="num"><strong>{p.quantity}</strong></td>
              <td data-label="Status"><StockBadge quantity={p.quantity} /></td>
              <td className="actions-col">
                <div className="row-actions">
                  <button className="icon-btn" onClick={() => onEdit(p)} aria-label={`Edit ${p.name}`} title="Edit">
                    <Pencil size={17} />
                  </button>
                  <button className="icon-btn danger" onClick={() => onDelete(p)} aria-label={`Delete ${p.name}`} title="Delete">
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
