import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PendingActions, Visibility, PlayArrow } from "@mui/icons-material";
import useLoadOptions from "../hooks/useLoadOptions";
import Header from "/src/components/header/Header.jsx";

const STATUS_COLORS = {
  "enviado ao supervisor": "warning",
  "visualizado": "info",
  "em andamento": "primary",
  "finalizado": "success",
  "pendente": "error"
};

const DashboardPage = () => {
  const { atividades, solicitacoes } = useLoadOptions();
  
  const [dados, setDados] = useState({
    solicitacoesPendentes: 0,
    solicitacoesVisualizadas: 0,
    atividadesEmAndamento: 0,
    atividadesConcluidas: 0,
    atividadesPendentes: 0,
  });

  useEffect(() => {
    setDados({
      solicitacoesPendentes: solicitacoes.reduce((contador, solicitacao) => 
        solicitacao.status === "enviado ao supervisor" ? contador + 1 : contador, 0
      ),
      solicitacoesVisualizadas: solicitacoes.reduce((contador, solicitacao) => 
        solicitacao.status === "visualizado" ? contador + 1 : contador, 0
      ),
      atividadesEmAndamento: atividades.reduce((contador, atividade) => 
        atividade.status === "em andamento" ? contador + 1 : contador, 0
      ),
      atividadesConcluidas: atividades.reduce((contador, atividade) => 
        atividade.status === "finalizado" ? contador + 1 : contador, 0
      ),
      atividadesPendentes: atividades.reduce((contador, atividade) => 
        atividade.status === "pendente" ? contador + 1 : contador, 0
      ),
    });
  }, [atividades, solicitacoes]);

  const dataAtividades = [
    { name: "Atividades Pendentes", value: dados.atividadesPendentes },
    { name: "Em andamento", value: dados.atividadesEmAndamento },
    { name: "Concluídas", value: dados.atividadesConcluidas },
  ];

  return (
    <Box p={3}>
      <Header titulo="Dashboard" />

      <Grid2 container spacing={2}>
        {/* Cards ajustados */}
        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ff9800", color: "white" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <PendingActions sx={{ mr: 1 }} /> Solicitações Pendentes
              </Typography>
              <Typography variant="h4">{dados.solicitacoesPendentes}</Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#2196f3", color: "white" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <Visibility sx={{ mr: 1 }} /> Solicitações Visualizadas
              </Typography>
              <Typography variant="h4">{dados.solicitacoesVisualizadas}</Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ff5722", color: "white" }}>
            <CardContent>
              <Typography variant="h6" display="flex" alignItems="center">
                <PlayArrow sx={{ mr: 1 }} /> Atividades em Andamento
              </Typography>
              <Typography variant="h4">{dados.atividadesEmAndamento}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Box width="100%">
          <Typography variant="h6" gutterBottom>
            Estatísticas de Atividades
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataAtividades}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
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
                <TableCell>
                  <Chip label={solicitacao.status} color={STATUS_COLORS[solicitacao.status] || "default"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DashboardPage;
