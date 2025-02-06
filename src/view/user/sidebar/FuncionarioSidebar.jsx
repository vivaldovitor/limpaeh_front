import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from '@/components/sidebar/Sidebar';

const FuncionarioSidebar = () => {
  const token = localStorage.getItem('token');

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/funcionario/dashboard' },
    { text: 'Minhas Atividades', icon: <TaskIcon />, path: '/funcionario/atividades' },
    { text: 'Meus Relatórios', icon: <AssignmentIcon />, path: '/funcionario/relatorios' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/funcionario/perfil' },
    token && { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ].filter(Boolean);

  return <Sidebar menuItems={menuItems} />;
};

export default FuncionarioSidebar;
