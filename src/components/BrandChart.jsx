// Simple horizontal bar chart built with CSS (no chart library)
function BrandChart({ data }) {
  if (data.length === 0) {
    return <p className="muted">Add products to see the chart.</p>;
  }
  const max = Math.max(...data.map((d) => d.units), 1);

  return (
    <ul className="brand-chart">
      {data.map((d) => (
        <li key={d.brand}>
          <div className="brand-chart-head">
            <span>{d.brand}</span>
            <strong>{d.units} units</strong>
          </div>
          <div className="bar-track" role="img" aria-label={`${d.brand}: ${d.units} units`}>
            <div className="bar-fill" style={{ width: `${(d.units / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BrandChart;
