import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Verifica o estado de autenticação

  // Se o usuário não está autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se o usuário está autenticado, renderiza a rota protegida
  return children;
};

export default ProtectedRoute;
