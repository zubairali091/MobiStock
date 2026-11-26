import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Download, AlertTriangle } from "lucide-react";
import ProductTable from "../components/ProductTable.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Pagination from "../components/Pagination.jsx";
import Modal from "../components/Modal.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { CATEGORIES, PAGE_SIZE, STATUS, getStockStatus } from "../utils/constants.js";
import { exportProductsCsv } from "../utils/exportCsv.js";
import "../styles/products.css";

function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  // Popups
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null means a new product
  const [deleting, setDeleting] = useState(null);

  // Build the brand dropdown options from the existing products
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort(), [products]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchSearch =
        !q || [p.name, p.brand, p.model, p.imei, p.color].some((v) => (v || "").toLowerCase().includes(q));
      const matchCategory = category === "All" || p.category === category;
      const matchBrand = brand === "All" || p.brand === brand;
      const matchStatus = status === "All" || getStockStatus(p.quantity) === status;
      return matchSearch && matchCategory && matchBrand && matchStatus;
    });
  }, [products, search, category, brand, status]);

  // Go back to page 1 whenever a filter changes
  useEffect(() => setPage(1), [search, category, brand, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages); // Keeps the page in range after deleting items
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const lowCount = products.filter((p) => getStockStatus(p.quantity) === STATUS.LOW).length;
  const outCount = products.filter((p) => getStockStatus(p.quantity) === STATUS.OUT).length;

  const hasFilters = search || category !== "All" || brand !== "All" || status !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setStatus("All");
  }

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(product) {
    setEditing(product);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSave(data) {
    if (editing) {
      updateProduct(editing.id, data);
      showToast(`${data.name} updated successfully.`);
    } else {
      addProduct(data);
      showToast(`${data.name} added to inventory.`);
    }
    closeForm();
  }

  function handleDelete() {
    deleteProduct(deleting.id);
    showToast(`${deleting.name} deleted.`, "error");
    setDeleting(null);
  }

  return (
    <div className="products-page">
      <div className="page-head">
        <div>
          <h2>Inventory</h2>
          <p className="muted">{products.length} products, {filtered.length} shown</p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-outline"
            onClick={() => {
              exportProductsCsv(filtered);
              showToast(`Exported ${filtered.length} products to CSV.`, "info");
            }}
            disabled={filtered.length === 0}
          >
            <Download size={18} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={18} /> Add product
          </button>
        </div>
      </div>

      {lowCount + outCount > 0 && (
        <div className="alert-banner" role="alert">
          <AlertTriangle size={20} />
          <p>
            <strong>{lowCount} low stock</strong> and <strong>{outCount} out of stock</strong> items need your attention.
          </p>
          <div className="alert-banner-actions">
            {lowCount > 0 && (
              <button className="btn btn-outline" onClick={() => setStatus(STATUS.LOW)}>Show low stock</button>
            )}
            {outCount > 0 && (
              <button className="btn btn-outline" onClick={() => setStatus(STATUS.OUT)}>Show out of stock</button>
            )}
          </div>
        </div>
      )}

      <div className="card filters">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, model or IMEI"
            aria-label="Search products"
          />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filter by brand">
          <option value="All">All brands</option>
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by stock status">
          <option value="All">All stock status</option>
          {Object.values(STATUS).map((s) => <option key={s}>{s}</option>)}
        </select>

        {hasFilters && (
          <button className="btn btn-outline" onClick={clearFilters}>Clear filters</button>
        )}
      </div>

      <div className="card table-card">
        <ProductTable items={pageItems} onEdit={openEdit} onDelete={setDeleting} />
        <Pagination
          page={safePage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onChange={setPage}
        />
      </div>

      {formOpen && (
        <Modal title={editing ? "Edit product" : "Add product"} onClose={closeForm} wide>
          <ProductForm initial={editing} onSubmit={handleSave} onCancel={closeForm} />
        </Modal>
      )}

      {deleting && (
        <ConfirmModal productName={deleting.name} onConfirm={handleDelete} onCancel={() => setDeleting(null)} />
      )}
    </div>
  );
}

export default Products;
