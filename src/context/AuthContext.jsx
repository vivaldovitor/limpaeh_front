import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrigido para remover chaves

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        if (decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        const { id, email, tipo_id: tipoId } = decoded.sub;

        setUser({
          id,
          email,
          tipoId,
          isAdmin: tipoId === 1,
          isSupervisor: tipoId === 2,
          isFuncionario: tipoId === 3,
        });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const setTokenAndUser = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    const { id, email, tipo_id: tipoId } = decoded.sub;

    const roles = {
      1: 'admin',
      2: 'supervisor',
      3: 'funcionário'
    };

    setUser({
      id,
      email,
      tipoId,
      isAdmin: tipoId === 1,
      isSupervisor: tipoId === 2,
      isFuncionario: tipoId === 3,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setTokenAndUser }}>
      {loading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
