import React, { useState, useEffect } from "react";
import { Container, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "@/components/header/Header";
import api from "@/services/api";

function AdminRelatorios() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);

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

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "funcionario", headerName: "Funcionário ID", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 300 },
    { field: "observacao", headerName: "Observação", width: 250 },
    { field: "horario_inicio", headerName: "Horário Início", width: 180 },
    { field: "horario_fim", headerName: "Horário Fim", width: 180 },
  ];

  const rows = relatorios.map((relatorio) => ({
    id: relatorio.id,
    funcionario: relatorio.funcionario_id,
    descricao: relatorio.descricao,
    horario_inicio: relatorio.horario_inicio,
    horario_fim: relatorio.horario_fim,
    observacao: relatorio.observacao,
  }));

  return (
    <>
      <Header titulo="Relatórios dos Funcionários" />
      {loading ? (
        <CircularProgress />
      ) : (
        <Container sx={{ height: 400, width: "100%" }}>
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

export default AdminRelatorios;