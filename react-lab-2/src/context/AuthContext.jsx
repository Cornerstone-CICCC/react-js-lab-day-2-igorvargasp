import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "", isLoggedIn: false });

  const login = (name) => {
    setUser({ name, isLoggedIn: true });
  };

  const logout = () => {
    setUser({ name: "", isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
