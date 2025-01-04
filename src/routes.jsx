import React from 'react';

// Importação de Páginas
import HomePage from '/src/pages/HomePage';
import SignIn from '/src/view/auth/SignIn';
import Unauthorized from '/src/route/user/Unauthorized';
import AdminLayout from '/src/view/admin/layout/AdminLayout';
import { routesAdmin } from './routesAdmin';

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
    name: 'Admin',
    path: '/admin',
    element: <AdminLayout />,
    children: routesAdmin
  },
];

export default routes;
