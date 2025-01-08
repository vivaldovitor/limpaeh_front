import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Sidebar from '../../../components/sidebar/Sidebar';

const SupervisorSidebar = () => {
  const token = localStorage.getItem('token');

  const menuItems = [
    { 
      text: 'Dashboard', icon: <DashboardIcon />, path: '/supervisor/dashboard' 
    },
    { 
      text: 'Atividades', icon: <AssignmentIcon />, path: '/supervisor/atividades' 
    },
    { 
      text: 'Solicitações de Atividades', icon: <PostAddIcon />, path: '/supervisor/solicitacoes' 
    },
    { 
      text: 'Perfil', icon: <PersonIcon/>, path: '/supervisor/perfil' 
    },
    token && { 
      text: 'Logout', icon: <LogoutIcon />, path: '/logout' 
    },
  ].filter(Boolean);

  return <Sidebar menuItems={menuItems} />;
};

export default SupervisorSidebar;
