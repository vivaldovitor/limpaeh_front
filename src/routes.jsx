import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importação de Páginas
import HomePage from '/src/pages/HomePage';
import SignIn from '/src/view/auth/SignIn';
import LogoutPage from './view/auth/Logout';
import { routesAdmin, routesSupervisor, routesFuncionarios } from './privateRoutes'; 
import PrivateRoute from './route/admin/PrivateRoute';  
import AdminLayout from './view/admin/layout/AdminLayout';  
import SupervisorRoute from './route/supervisor/SupervisorRoute';
import SupervisorLayout from './view/supervisor/layout/SupervisorLayout';
import FuncionarioRoute from './route/user/FuncionarioRoute';
import FuncionarioLayout from './view/user/layout/FuncionariosLayout';


const routes = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    name: 'Login',
    path: '/login',
    element: <SignIn />,
  },
  {
    name: 'Logout',
    path: '/logout',
    element: <LogoutPage />,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <PrivateRoute element={<AdminLayout />} />, 
    children: routesAdmin, 
  },
  {
    name: 'Supervisor',
    path: '/supervisor',
    element: <SupervisorRoute element={<SupervisorLayout />} />,
    children: routesSupervisor
  },
  {
    name: 'Funcionário',
    path: '/funcionario',
    element: <FuncionarioRoute element={<FuncionarioLayout />} />,
    children: routesFuncionarios
  }
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children && route.children.map((subRoute, idx) => (
            <Route key={idx} path={subRoute.path} element={subRoute.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
