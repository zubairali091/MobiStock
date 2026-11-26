export const CATEGORIES = ["Mobiles", "Accessories", "Tempered Glass", "Spare Parts"];

export const LOW_STOCK_LIMIT = 5; // Quantity below this value is Low Stock

export const PAGE_SIZE = 5; // Products per page

export const STATUS = {
  IN: "In Stock",
  LOW: "Low Stock",
  OUT: "Out of Stock",
};

export function getStockStatus(quantity) {
  const q = Number(quantity) || 0;
  if (q <= 0) return STATUS.OUT;
  if (q < LOW_STOCK_LIMIT) return STATUS.LOW;
  return STATUS.IN;
}
