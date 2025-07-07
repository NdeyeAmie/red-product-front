import { createContext, useState, useEffect } from "react";

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  // Charger l'utilisateur depuis le localStorage si existant
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUsers(JSON.parse(userInfo));
    }
  }, []);

  // Déconnexion (optionnel)
  const logout = () => {
    setUsers(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ users, setUsers, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
