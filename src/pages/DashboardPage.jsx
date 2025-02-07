import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PendingActions, PlayArrow, CheckCircle } from "@mui/icons-material";
import useLoadOptions from "../hooks/useLoadOptions";

const COLORS = ["#ffeb3b", "#ff9800", "#4caf50"];

const DashboardPage = () => {
  const { carregarDashboard, solicitacoes } = useLoadOptions();
  const [dados, setDados] = useState({
    solicitacoesPendentes: 10,
    atividadesEmAndamento: 20,
    atividadesConcluidas: 30,
  });

  useEffect(() => {
    const carregarDados = async () => {
      const response = await carregarDashboard();
      if (response) {
        setDados(response);
      }
    };
    carregarDados();
  }, []);

  const data = [
    { name: "Pendentes", value: dados.solicitacoesPendentes },
    { name: "Em andamento", value: dados.atividadesEmAndamento },
    { name: "Concluídas", value: dados.atividadesConcluidas },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ffeb3b" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <PendingActions sx={{ mr: 1 }} /> Solicitações Pendentes
              </Typography>
              <Typography variant="h4">{dados.solicitacoesPendentes}</Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ff9800" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <PlayArrow sx={{ mr: 1 }} /> Atividades em Andamento
              </Typography>
              <Typography variant="h4">{dados.atividadesEmAndamento}</Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#4caf50", color: "white" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <CheckCircle sx={{ mr: 1 }} /> Atividades Concluídas
              </Typography>
              <Typography variant="h4">{dados.atividadesConcluidas}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Box width="60%">
          <Typography variant="h6" gutterBottom>
            Estatísticas de Atividades
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box width="35%">
          <Typography variant="h6" gutterBottom>
            Distribuição de Atividades
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Últimas Solicitações
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitacoes.slice(0, 5).map((solicitacao) => (
              <TableRow key={solicitacao.id}>
                <TableCell>{solicitacao.id}</TableCell>
                <TableCell>{solicitacao.descricao}</TableCell>
                <TableCell>{solicitacao.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DashboardPage;