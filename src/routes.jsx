import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importação de Páginas
import HomePage from '/src/pages/HomePage';
import SignIn from '/src/view/auth/SignIn';
import Unauthorized from '/src/route/user/Unauthorized';
import LogoutPage from './view/auth/Logout';
import { routesAdmin, routesSupervisor } from './privateRoutes'; 
import PrivateRoute from './route/admin/PrivateRoute';  // Importando o PrivateRoute
import AdminLayout from './view/admin/layout/AdminLayout';  // Layout do Admin
import SupervisorRoute from './route/supervisor/SupervisorRoute';
import SupervisorLayout from './view/supervisor/layout/SupervisorLayout';

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
    name: 'Unauthorized',
    path: '/unauthorized',
    element: <Unauthorized />,
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
