// Safe helpers for localStorage.
// try/catch prevents the app from crashing if saved data is corrupted or storage is blocked.

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is full or blocked: ignore silently
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const KEYS = {
  users: "mobistock_users",
  session: "mobistock_session",
  products: "mobistock_products",
  activity: "mobistock_activity",
};
