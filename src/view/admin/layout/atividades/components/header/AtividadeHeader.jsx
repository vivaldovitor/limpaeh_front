import React from 'react';
import { AppBar, Toolbar} from '@mui/material';
import { Title } from '/src/styles/Toolbar.js'

function AtividadeHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h5">
          LimpAeh - Atividades
        </Title>
      </Toolbar>
    </AppBar>
  );
}

export default AtividadeHeader;
