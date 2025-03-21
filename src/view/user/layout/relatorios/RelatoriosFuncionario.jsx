import React, { useState, useEffect } from "react";
import useCustomNavigate from "@/hooks/useCustomNavigate";
import { Container, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "@/components/header/Header";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext"; // Importação para obter usuário autenticado

function RelatorioFuncionario() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const { goTo } = useCustomNavigate();
  const { user } = useAuth(); // Obtendo o usuário autenticado

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const response = await api.get('/relatorios');
        if (Array.isArray(response.data.relatorios)) {
          // Filtrando apenas os relatórios do usuário autenticado
          const relatoriosDoUsuario = response.data.relatorios.filter(
            (relatorio) => relatorio.funcionario_id === user.id
          );
          setRelatorios(relatoriosDoUsuario);
        } else {
          console.error("A resposta da API não contém um array de relatórios");
        }
      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRelatorios();
    }
  }, [user]);

  const handleVisualizarRelatorio = (id) => {
    goTo(`/funcionario/relatorios/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'observacao', headerName: 'Observação', width: 250 },
    { field: 'horario_inicio', headerName: 'Horário Início', width: 180 },
    { field: 'horario_fim', headerName: 'Horário Fim', width: 180 },
    {
      field: 'acao',
      headerName: 'Ações',
      width: 180,
      renderCell: (params) => (
        <button onClick={() => handleVisualizarRelatorio(params.row.id)}>Visualizar</button>
      ),
    }
  ];

  const rows = relatorios.map((relatorio) => ({
    id: relatorio.id,
    descricao: relatorio.descricao,
    horario_inicio: relatorio.horario_inicio,
    horario_fim: relatorio.horario_fim,
    observacao: relatorio.observacao,
  }));

  return (
    <>
      <Header titulo="Meus Relatórios" />
      {loading ? (
        <CircularProgress />
      ) : (
        <Container sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            disableSelectionOnClick
          />
        </Container>
      )}
    </>
  );
}

export default RelatorioFuncionario;
