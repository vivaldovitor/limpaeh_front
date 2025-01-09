import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import FuncionarioSidebar from '../sidebar/FuncionarioSidebar';

const FuncionarioLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <FuncionarioSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default FuncionarioLayout;
