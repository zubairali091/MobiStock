import { CATEGORIES } from "./constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignup({ name, email, password, confirm }) {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  else if (name.trim().length < 3) errors.name = "Name must be at least 3 characters.";

  if (!email.trim()) errors.email = "Enter your email.";
  else if (!emailRegex.test(email.trim())) errors.email = "Enter a valid email, e.g. ali@example.com";

  if (!password) errors.password = "Enter your password.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";

  if (!confirm) errors.confirm = "Confirm your password.";
  else if (confirm !== password) errors.confirm = "Passwords do not match.";
  return errors;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email.";
  else if (!emailRegex.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateProduct(f) {
  const errors = {};

  if (!f.name.trim()) errors.name = "Enter the product name.";
  if (!f.brand.trim()) errors.brand = "Enter the brand.";
  if (!CATEGORIES.includes(f.category)) errors.category = "Select a category.";

  // IMEI applies to mobiles only (15 digits)
  if (f.category === "Mobiles") {
    if (!f.imei.trim()) errors.imei = "IMEI is required for mobiles.";
    else if (!/^\d{15}$/.test(f.imei.trim())) errors.imei = "IMEI must be exactly 15 digits.";
  }

  const purchase = Number(f.purchasePrice);
  const sale = Number(f.salePrice);
  const qty = Number(f.quantity);

  if (f.purchasePrice === "" || Number.isNaN(purchase) || purchase < 0)
    errors.purchasePrice = "Enter a valid purchase price.";
  if (f.salePrice === "" || Number.isNaN(sale) || sale < 0)
    errors.salePrice = "Enter a valid sale price.";
  else if (!errors.purchasePrice && sale < purchase)
    errors.salePrice = "Sale price cannot be lower than the purchase price.";

  if (f.quantity === "" || Number.isNaN(qty) || !Number.isInteger(qty) || qty < 0)
    errors.quantity = "Quantity must be a whole number (0 or more).";

  return errors;
}
