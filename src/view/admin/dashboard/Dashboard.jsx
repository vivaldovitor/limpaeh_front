import React, { useState, useEffect } from 'react';
import { Box, Grid2, CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AtividadesRecentes from './components/cards/AtividadesRecentes';
import NumeroFuncionarios from './components/cards/NumeroFuncionarios';
import api from '../../../services/api';
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await api.get('/funcionarios');
        const funcionarios = userResponse.data.funcionarios;
        
        const filteredFuncionarios = funcionarios.filter(f => f.tipo.descricao === "funcionário");

        setUserCount(filteredFuncionarios.length);
        
        // Gerar dados para o gráfico com base nos funcionários
        const labels = filteredFuncionarios.map(f => f.nome);
        const data = filteredFuncionarios.map(() => Math.floor(Math.random() * 20) + 1); // Dados simulados

        setChartData({
          labels,
          datasets: [
            {
              label: 'Atividades Recentes por Funcionário',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
    <DashboardHeader />
    <Box sx={{ p: 3 }}>

      <Grid2 container spacing={3}>
        <Grid2 item xs={12} sm={6} md={4}>
          <NumeroFuncionarios chartData={chartData} userCount={userCount} />
        </Grid2>

        <Grid2 item xs={12} sm={6} md={4}>
            <AtividadesRecentes chartData={chartData} />
        </Grid2>

      </Grid2>
    </Box>
    </>
  );
};

export default Dashboard;
