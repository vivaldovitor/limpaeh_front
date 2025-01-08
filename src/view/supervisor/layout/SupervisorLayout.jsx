import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import SupervisorSidebar from '../sidebar/SupervisorSidebar';

const SupervisorLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SupervisorSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SupervisorLayout;
