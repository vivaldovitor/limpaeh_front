import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function FuncionarioHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh - Funcionários
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default FuncionarioHeader;
