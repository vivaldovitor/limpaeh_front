import React from 'react';

import {
  MdDashboard,
  MdPeople,
  MdBusiness,
  MdSettings,
  MdAssignment
} from 'react-icons/md';

import Dashboard from './view/admin/dashboard/Dashboard';
import FuncionariosAdmin from './view/admin/layout/funcionario/FuncionariosAdmin';
import EmpresasAdmin from './view/admin/layout/empresa/EmpresasAdmin';
import CadastrarEmpresa from './view/admin/layout/empresa/components/CadastrarEmpresa';
import CadastrarFuncionario from './view/admin/layout/funcionario/components/CadastrarFuncionario';
import EditarFuncionario from './view/admin/layout/funcionario/components/EditarFuncionario';
import EditarEmpresa from './view/admin/layout/empresa/components/EditarEmpresa';
import AtividadesAdmin from './view/admin/layout/atividades/AtividadesAdmin';
import CadastrarAtividade from './view/admin/layout/atividades/components/CadastrarAtividade';
import EditarAtividade from './view/admin/layout/atividades/components/EditarAtividade';
import SolicitacoesAdmin from './view/admin/layout/solicitacoes/SolicitacoesAdmin';
import CadastrarSolicitacao from './view/admin/layout/solicitacoes/components/CadastrarSolicitacao';
import EditarSolicitacao from './view/admin/layout/solicitacoes/components/EditarSolicitacao';

export const routesAdmin = [
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
        name: 'Editar Funcionário',
        path: 'funcionario/editar/:funcionarioId',
        icon: MdSettings,
        element: <EditarFuncionario />,
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
    {
        name: 'Editar Empresa',
        path: 'empresa/editar/:empresaId',
        icon: MdSettings,
        element: <EditarEmpresa />,
    },
    {
        name: 'Atividades ',
        path: 'atividades',
        icon: MdAssignment,
        element: <AtividadesAdmin />,
    },
    {
        name: 'Cadastrar Atividade ',
        path: 'atividades/cadastrar',
        icon: MdSettings,
        element: <CadastrarAtividade/>,
    },
    {
        name: 'Editar Atividade ',
        path: 'atividades/editar/:atividadeId',
        icon: MdSettings,
        element: <EditarAtividade/>,
    },
    {
        name: 'Solicitações',
        path: 'solicitacoes',
        icon: MdAssignment,
        element: <SolicitacoesAdmin />,
    },
    {
        name: 'Cadastrar Solicitação ',
        path: 'solicitacoes/cadastrar',
        icon: MdSettings,
        element: <CadastrarSolicitacao/>,
    },
    {
        name: 'Editar Solicitação ',
        path: 'solicitacao/editar/:solicitacaoId',
        icon: MdSettings,
        element: <EditarSolicitacao/>,
    },       
]
