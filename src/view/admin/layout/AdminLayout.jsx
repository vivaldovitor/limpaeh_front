import React from 'react';
import { Outlet } from 'react-router-dom'; // Importe o Outlet
import Sidebar from '../../../components/sidebar/Sidebar';
import { Box } from '@mui/material';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
