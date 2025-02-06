import React, { useState, useEffect } from "react";
import useCustomNavigate from "@/hooks/useCustomNavigate";
import { Container, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "@/components/header/Header";
import api from "@/services/api";

function RelatorioFuncionario() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const { goTo } = useCustomNavigate();

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const response = await api.get('/relatorios');
        if (Array.isArray(response.data.relatorios)) {
          setRelatorios(response.data.relatorios);
        } else {
          console.error("A resposta da API não contém um array de relatórios");
        }
      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, []);

  const handleVisualizarRelatorio = async (id) => { 
      try {
        goTo(`/funcionario/relatorios/${id}`);       
      } catch (error) {
        console.error('Erro ao visualizar relatório:', error);
        alert('Não foi possível visualizar o relatório.');
      }
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
      <Header titulo="Meus Relatórios"/>
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
