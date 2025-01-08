import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Sidebar from '../../../components/sidebar/Sidebar';

const AdminSidebar = () => {
  const token = localStorage.getItem('token');

  const menuItems = [
    { 
      text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' 
    },
    { 
      text: 'Funcionários', icon: <PeopleIcon />, path: '/admin/funcionarios' 
    },
    { 
      text: 'Empresas', icon: <BusinessIcon />, path: '/admin/empresas' 
    },
    { 
      text: 'Atividades', icon: <AssignmentIcon />, path: '/admin/atividades' 
    },
    { 
      text: 'Solicitações de Atividades', icon: <PostAddIcon />, path: '/admin/solicitacoes' 
    },
    { 
      text: 'Perfil', icon: <PersonIcon/>, path: '/admin/perfil' 
    },
    token && {
      text: 'Logout', icon: <LogoutIcon />, path: '/logout' 
    },
  ].filter(Boolean);

  return <Sidebar menuItems={menuItems} />;
};

export default AdminSidebar;
