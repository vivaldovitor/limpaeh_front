import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, CircularProgress, Typography, Card, CardContent, Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField 
} from "@mui/material";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

function Relatorio() {
  const { relatorioId } = useParams();
  const navigate = useNavigate();
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editedRelatorio, setEditedRelatorio] = useState({ descricao: "", observacao: "" });
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const response = await api.get(`/relatorio/${relatorioId}`);
        const data = response.data.relatorio;

        if (data.funcionario_id !== user.id) {
          alert("Acesso negado. Você não tem permissão para visualizar este relatório.");
          navigate(-1);
          return;
        }

        setRelatorio(data);
        setEditedRelatorio({
          descricao: data.descricao,
          observacao: data.observacao
        });
      } catch (error) {
        console.error("Erro ao carregar o relatório:", error);
        alert("Não foi possível carregar o relatório.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorio();
  }, [relatorioId, user.id, navigate]);

  const handleEditar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditedRelatorio({
      ...editedRelatorio,
      [e.target.name]: e.target.value
    });
  };

  const handleSalvar = async () => {
    try {
      await api.put(`/relatorio/${relatorioId}`, editedRelatorio);
      setRelatorio(prev => ({
        ...prev,
        descricao: editedRelatorio.descricao,
        observacao: editedRelatorio.observacao
      }));
      alert("Relatório atualizado com sucesso!");
      setOpen(false);
      
    } catch (error) {
      console.error("Erro ao atualizar o relatório:", error);
      alert("Erro ao atualizar o relatório.");
    }
  };

  const handleExcluir = async () => {
    if (window.confirm("Tem certeza que deseja excluir este relatório?")) {
      try {
        await api.delete(`/relatorio/${relatorioId}`);
        alert("Relatório excluído com sucesso.");
        navigate(-1);
      } catch (error) {
        console.error("Erro ao excluir o relatório:", error);
        alert("Erro ao excluir o relatório.");
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!relatorio) {
    return (
      <Typography variant="h6" textAlign="center">
        Relatório não encontrado.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {relatorio.descricao}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1"><strong>Observação:</strong> {relatorio.observacao}</Typography>
          <Typography variant="body1"><strong>Horário de Início:</strong> {relatorio.horario_inicio}</Typography>
          <Typography variant="body1"><strong>Horário de Fim:</strong> {relatorio.horario_fim}</Typography>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              onClick={handleEditar}
            >
              Editar
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
              onClick={handleExcluir}
            >
              Excluir
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="outlined" onClick={() => navigate(-1)}>Voltar</Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Relatório</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Descrição"
            name="descricao"
            value={editedRelatorio.descricao}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Observação"
            name="observacao"
            value={editedRelatorio.observacao}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button onClick={handleSalvar} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Relatorio;
