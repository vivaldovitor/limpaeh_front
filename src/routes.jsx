import React from 'react';
import {
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdSettings,
} from 'react-icons/md';

// Importação de Páginas
import HomePage from '/src/pages/HomePage';
import SignIn from '/src/view/auth/SignIn';
import Unauthorized from '/src/route/user/Unauthorized';
import AdminLayout from '/src/view/admin/layout/AdminLayout';
import Dashboard from './view/admin/dashboard/Dashboard';
import FuncionariosAdmin from './view/admin/layout/funcionario/FuncionariosAdmin';
import EmpresasAdmin from './view/admin/layout/empresa/EmpresasAdmin';
import CadastrarEmpresa from './view/admin/layout/empresa/components/CadastrarEmpresa';
import CadastrarFuncionario from './view/admin/layout/funcionario/components/CadastrarFuncionario';

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
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: MdDashboard,
        element: <Dashboard />,
      },
      {
        name: 'Funcionários',
        path: 'funcionarios',
        icon: MdPeople,
        element: <FuncionariosAdmin />,
      },
      {
        name: 'Cadastrar Funcionário',
        path: 'funcionarios/cadastrar',
        icon: MdSettings,
        element: <CadastrarFuncionario />,
      },
      {
        name: 'Empresas',
        path: 'empresas',
        icon: MdBusiness,
        element: <EmpresasAdmin />,
      },
      {
        name: 'Cadastrar Empresa',
        path: 'empresas/cadastrar',
        icon: MdSettings,
        element: <CadastrarEmpresa />,
      },
    ],
  },
];

export default routes;
