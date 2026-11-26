import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { KEYS, readStorage, removeStorage, writeStorage } from "../utils/storage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Read the saved session so the user stays logged in after a page refresh
  const [user, setUser] = useState(() => readStorage(KEYS.session, null));

  const signup = useCallback(({ name, email, password }) => {
    const users = readStorage(KEYS.users, []);
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    // NOTE: the password is stored as plain text for this demo only.
    // A real application would use a backend and password hashing.
    const newUser = { id: Date.now().toString(), name: name.trim(), email: cleanEmail, password };
    writeStorage(KEYS.users, [...users, newUser]);

    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    writeStorage(KEYS.session, session);
    setUser(session);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = readStorage(KEYS.users, []);
    const found = users.find((u) => u.email === email.trim().toLowerCase());

    if (!found) return { ok: false, error: "No account found for this email. Please sign up first." };
    if (found.password !== password) return { ok: false, error: "Incorrect password." };

    const session = { id: found.id, name: found.name, email: found.email };
    writeStorage(KEYS.session, session);
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    removeStorage(KEYS.session);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signup, login, logout }), [user, signup, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
