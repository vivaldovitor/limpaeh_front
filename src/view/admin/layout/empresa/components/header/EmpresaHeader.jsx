import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function EmpresaHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh - Empresas
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default EmpresaHeader;
