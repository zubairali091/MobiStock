// Download the given products as a CSV file (opens in Excel / Google Sheets)

const COLUMNS = [
  ["Name", "name"],
  ["Category", "category"],
  ["Brand", "brand"],
  ["Model", "model"],
  ["RAM / Storage", "ramStorage"],
  ["Color", "color"],
  ["IMEI", "imei"],
  ["Purchase price (PKR)", "purchasePrice"],
  ["Sale price (PKR)", "salePrice"],
  ["Quantity", "quantity"],
];

function escapeCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function exportProductsCsv(products) {
  const header = COLUMNS.map(([label]) => label).join(",");
  const rows = products.map((p) =>
    COLUMNS.map(([, key]) => {
      // ="..." keeps Excel from turning a 15-digit IMEI into scientific notation
      if (key === "imei") return p.imei ? `="${p.imei}"` : "";
      return escapeCell(p[key]);
    }).join(",")
  );

  const csv = [header, ...rows].join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `mobistock-inventory-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
