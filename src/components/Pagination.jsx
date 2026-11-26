import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, totalItems, pageSize, onChange }) {
  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {from}–{to} of {totalItems}
      </span>
      <div className="pagination-controls">
        <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
          <ChevronLeft size={18} />
        </button>
        {pages.map((n) => (
          <button
            key={n}
            className={`page-btn ${n === page ? "active" : ""}`}
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ))}
        <button className="page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Next page">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
