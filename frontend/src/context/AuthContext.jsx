import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

// Demo auth stored in localStorage. Replace login/logout with your API calls.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("jr_user") || "null");
    } catch {
      return null;
    }
  });

  const login = async ({ name, email }) => {
    const u = {
      name: name || email.split("@")[0],
      email,
      customerId: "GS" + String(Math.abs(hash(email))).slice(0, 6),
    };
    localStorage.setItem("jr_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = async () => {
    localStorage.removeItem("jr_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}
