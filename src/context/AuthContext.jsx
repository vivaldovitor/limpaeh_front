import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          ...decoded.sub,  
          isAdmin: decoded.sub.tipo_id === 1
        });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {loading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  );
};
