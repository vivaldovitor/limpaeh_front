import React from 'react';
import { CardContent } from '@mui/material';
import { CardTitle, CardDescription, StyledCard } from '/src/styles/CardStyles.js';
import  { StyledButton } from '/src/styles/Toolbar.js';


function WelcomeCard() {
  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h5" gutterBottom>
          Bem-vindo ao LimpAeh!
        </CardTitle>
        <CardDescription variant="body1">
          Um sistema moderno para gerenciar e organizar a limpeza do seu ambiente.
        </CardDescription>
        <StyledButton variant="contained">
          Saiba Mais
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
}

export default WelcomeCard;
