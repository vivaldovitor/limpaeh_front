import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FuncionarioRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.tipoId !== 3) {
    return <Navigate to="/login" replace={true} />;
  }

  return element;
};

export default FuncionarioRoute;
