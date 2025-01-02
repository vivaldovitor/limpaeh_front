import React from 'react';
import { CardContent } from '@mui/material';
import { CardTitle, CardDescription, CardButton, StyledCard } from '/src/styles/CardStyles.js';
import useCustomNavigate from "/src/hooks/useCustomNagivates";

function FeaturesCard() {
  const { goTo } = useCustomNavigate();

  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h5" gutterBottom>
          Funcionalidades
        </CardTitle>
        <CardDescription variant="body1">
          - Registro de limpezas<br />
          - Relatórios detalhados<br />
          - Monitoramento em tempo real
        </CardDescription>
        <CardButton
          variant="contained"
          color="secondary" 
          style={{ marginTop: '10px' }}
          onClick={() => goTo('/login')}>
          Começar Agora
        </CardButton>
      </CardContent>
    </StyledCard>
  );
}

export default FeaturesCard;
