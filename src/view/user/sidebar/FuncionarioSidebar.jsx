import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from '../../../components/sidebar/Sidebar';

const FuncionarioSidebar = () => {
  const token = localStorage.getItem('token');

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Atividades', icon: <AssignmentIcon />, path: '/atividades' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/atividades' },
    token && { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },

  ].filter(Boolean);

  return <Sidebar menuItems={menuItems} />;
};

export default FuncionarioSidebar;
