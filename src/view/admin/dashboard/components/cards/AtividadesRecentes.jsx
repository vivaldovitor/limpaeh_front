import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { StyledCard } from '/src/styles/CardStyles.js';

function AtividadesRecentes({ chartData }) {
    return (
        <Card>
        <StyledCard>
        <CardContent>
        <Typography variant="h6" gutterBottom>
            Atividades Recentes
        </Typography>
        <Bar 
        data={chartData} 
        options={{ 
        responsive: true, 
        plugins: { 
            title: { display: true, text: 'Atividades Recentes' } 
        } 
        }} 
        />
        </CardContent>
        </StyledCard>
        </Card>
    );
}

export default AtividadesRecentes;
