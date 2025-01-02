import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function DashboardHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh - Dashboard
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardHeader;
