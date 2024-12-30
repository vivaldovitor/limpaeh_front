import React from 'react';
import { CardContent } from '@mui/material';
import { CardTitle, CardDescription, CardButton } from '/src/styles/CardStyles.js';
import { StyledCard } from '../../styles/CardStyles';


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
        <CardButton variant="contained">
          Saiba Mais
        </CardButton>
      </CardContent>
    </StyledCard>
  );
}

export default WelcomeCard;
