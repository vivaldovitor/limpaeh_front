import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CardTitle, StyledCard } from '/src/styles/CardStyles.js';

function NumeroFuncionarios({ userCount }) {
    return (
        <Card>
        <StyledCard>
            <CardContent>
            <CardTitle variant="h5" gutterBottom>
                Número de Funcionários
            </CardTitle>
            <Typography variant="h4" sx={{ mb: 2 }}>
                {userCount}
            </Typography>
            </CardContent>
        </StyledCard>
        </Card>
    );
}

export default NumeroFuncionarios;
