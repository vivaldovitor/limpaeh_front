import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SupervisorRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || (!user.isAdmin && !user.isSupervisor)) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  return element;
};

export default SupervisorRoute;
