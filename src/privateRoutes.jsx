import React from 'react';
import Dashboard from './components/dashboard/DashboardAdmin';

// admin
import {
    FuncionariosAdmin,
    CadastrarFuncionario,
    EditarFuncionario,
    EmpresasAdmin,
    CadastrarEmpresa,
    EditarEmpresa,
    SolicitacoesAdmin,
    SolicitacaoForm,
    EditarSolicitacao,
    AmbientesAdmin,
    EditarAmbiente,
    CadastrarAmbiente,
    ProfileAdmin,
} from '/src/view/admin';


// supervisor
import {
    AtividadesSupervisor,
    CadastrarAtividade,
    EditarAtividade,
    SolicitacoesSupervisor,
    ProfileSupervisor
} from '/src/view/supervisor';

// funcionário
import {
    AtividadesFuncionario,
    ProfileFuncionario,
    CadastrarRelatorio,
    EditarRelatorio,
    RelatorioFuncionario,
    Relatorio,
} from '/src/view/user';


export const routesAdmin = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        name: 'Funcionários',
        path: 'funcionarios',
        element: <FuncionariosAdmin />,
    },
    {
        name: 'Cadastrar Funcionário',
        path: 'funcionarios/cadastrar',
        element: <CadastrarFuncionario />,
    },
    {
        name: 'Editar Funcionário',
        path: 'funcionarios/editar/:funcionarioId',
        element: <EditarFuncionario />,
    },
    {
        name: 'Empresas',
        path: 'empresas',
        element: <EmpresasAdmin />,
    },
    {
        name: 'Cadastrar Empresa',
        path: 'empresas/cadastrar',
        element: <CadastrarEmpresa />,
    },
    {
        name: 'Editar Empresa',
        path: 'empresas/editar/:empresaId',
        element: <EditarEmpresa />,
    },
    {
        name: 'Solicitações',
        path: 'solicitacoes',
        element: <SolicitacoesAdmin />,
    },
    {
        name: 'Cadastrar Solicitação',
        path: 'solicitacoes/cadastrar',
        element: <SolicitacaoForm />,
    },
    {
        name: 'Editar Solicitação',
        path: 'solicitacoes/editar/:solicitacaoId',
        element: <EditarSolicitacao />,
    },
    {
        name: 'Ambientes',
        path: 'ambientes',
        element: <AmbientesAdmin />,
    },
    {
        name: 'Cadastrar Ambiente',
        path: 'ambientes/cadastrar',
        element: <CadastrarAmbiente />,
    },
    {
        name: 'Editar Ambiente',
        path: 'ambientes/editar/:ambienteId',
        element: <EditarAmbiente />,
    },
    {
        name: 'Perfil',
        path: '/admin/perfil',
        element: <ProfileAdmin />,
    },
];


export const routesSupervisor = [
    {
        name: 'Supervisor Dashboard',
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        name: 'Atividades',
        path: 'atividades',
        element: <AtividadesSupervisor />,
    },
    {      
        name: 'Cadastrar Atividade',
        path: 'atividades/cadastrar',
        element: <CadastrarAtividade />,        
    },
    {
        name: 'Editar Atividade',
        path: 'atividades/editar/:atividadeId',
        element: <EditarAtividade />,
    },
    {
        name: 'Perfil',
        path: '/supervisor/perfil',
        element: <ProfileSupervisor />,
    },
    {
        name: 'Solicitações',
        path: '/supervisor/solicitacoes',
        element: <SolicitacoesSupervisor />,
    }
]


export const routesFuncionarios = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        name: 'Atividades',
        path: 'atividades',
        element: <AtividadesFuncionario />,  
    },
    {
        name: 'Perfil',
        path: '/funcionario/perfil',
        element: <ProfileFuncionario />,
    },
    {
        name: 'Relatórios',
        path: 'atividades/relatorios/cadastrar/:atividadeId',
        element: <CadastrarRelatorio />,
    },
    {
        name: 'Relatórios',
        path: 'atividades/relatorios/editar/:atividadeId',
        element: <EditarRelatorio />,
    },
    {
        name: 'Relatórios',
        path: 'relatorios',
        element: <RelatorioFuncionario/>
    },
    {
        name: 'Relatório',
        path: 'relatorios/:relatorioId',
        element: <Relatorio/>
    },
];
