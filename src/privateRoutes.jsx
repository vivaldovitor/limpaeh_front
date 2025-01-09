import React from 'react';
import { MdDashboard, MdPeople, MdBusiness, MdSettings, MdAssignment } from 'react-icons/md';

// admin
import Dashboard from '/src/view/admin/dashboard/DashboardAdmin';
import FuncionariosAdmin from '/src/view/admin/layout/funcionario/FuncionariosAdmin';
import EmpresasAdmin from '/src/view/admin/layout/empresa/EmpresasAdmin';
import CadastrarEmpresa from '/src/view/admin/layout/empresa/components/CadastrarEmpresa';
import CadastrarFuncionario from '/src/view/admin/layout/funcionario/components/CadastrarFuncionario';
import EditarFuncionario from '/src/view/admin/layout/funcionario/components/EditarFuncionario';
import EditarEmpresa from '/src/view/admin/layout/empresa/components/EditarEmpresa';
import AtividadesAdmin from '/src/view/admin/layout/atividades/AtividadesAdmin';
import CadastrarAtividade from '/src/view/admin/layout/atividades/components/CadastrarAtividade';
import EditarAtividade from '/src/view/admin/layout/atividades/components/EditarAtividade';
import SolicitacoesAdmin from '/src/view/admin/layout/solicitacoes/SolicitacoesAdmin';
import CadastrarSolicitacao from '/src/view/admin/layout/solicitacoes/components/CadastrarSolicitacao';
import EditarSolicitacao from '/src/view/admin/layout/solicitacoes/components/EditarSolicitacao';
import ProfileAdmin from '/src/view/admin/profile/ProfileAdmin.jsx';

// supervisor
import AtividadesSupervisor from './view/supervisor/layout/atividades/AtividadesSupervisor';
import ProfileSupervisor from '/src/view/supervisor/profile/ProfileSupervisor.jsx';
import SolicitacoesSupervisor from './view/supervisor/layout/solicitacoes/SolicitacoesSupervisor';
import EditarAtividadeSupervisor from './view/supervisor/layout/atividades/components/EditarAtividade';
import CadastrarAtividadeSupervisor from './view/supervisor/layout/atividades/components/CadastrarAtividade';

// funcionário
import AtividadesFuncionario from './view/user/layout/atividades/AtividadesFuncionario'; 
import ProfileFuncionario from './view/user/profile/ProfileFuncionario';


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
        name: 'Atividades',
        path: 'atividades',
        icon: MdAssignment,
        element: <AtividadesAdmin />,
    },
    {
        name: 'Cadastrar Atividade',
        path: 'atividades/cadastrar',
        icon: MdSettings,
        element: <CadastrarAtividade />,
    },
    {
        name: 'Editar Atividade',
        path: 'atividades/editar/:atividadeId',
        icon: MdSettings,
        element: <EditarAtividade />,
    },
    {
        name: 'Solicitações',
        path: 'solicitacoes',
        icon: MdAssignment,
        element: <SolicitacoesAdmin />,
    },
    {
        name: 'Cadastrar Solicitação',
        path: 'solicitacoes/cadastrar',
        icon: MdSettings,
        element: <CadastrarSolicitacao />,
    },
    {
        name: 'Editar Solicitação',
        path: 'solicitacao/editar/:solicitacaoId',
        icon: MdSettings,
        element: <EditarSolicitacao />,
    },
    {
        name: 'Perfil',
        path: '/admin/perfil',
        icon: MdSettings,
        element: <ProfileAdmin />,
    },
];


export const routesSupervisor = [
    {
        name: 'Supervisor Dashboard',
        path: 'dashboard',
        icon: MdDashboard,
        element: <Dashboard />,
    },
    {
        name: 'Atividades',
        path: 'atividades',
        icon: MdAssignment,
        element: <AtividadesSupervisor />,
    },
    {      
        name: 'Cadastrar Atividade',
        path: 'atividades/cadastrar',
        icon: MdSettings,
        element: <CadastrarAtividadeSupervisor />,        
    },
    {
        name: 'Editar Atividade',
        path: 'atividades/editar/:atividadeId',
        icon: MdSettings,
        element: <EditarAtividadeSupervisor />,
    },
    {
        name: 'Perfil',
        path: '/supervisor/perfil',
        icon: MdSettings,
        element: <ProfileSupervisor />,
    },
    {
        name: 'Solicitações',
        path: '/supervisor/solicitacoes',
        icon: MdSettings,
        element: <SolicitacoesSupervisor />,
    }
]


export const routesFuncionarios = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        icon: MdDashboard,
        element: <Dashboard />,  // Crie o componente de dashboard do funcionário
    },
    {
        name: 'Atividades',
        path: 'atividades',
        icon: MdAssignment,
        element: <AtividadesFuncionario />,  // Crie o componente de atividades do funcionário
    },
    {
        name: 'Perfil',
        path: '/funcionario/perfil',
        icon: MdSettings,
        element: <ProfileFuncionario />,
    },
];
