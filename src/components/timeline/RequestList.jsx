import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton, Chip, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { useAuth } from "../../context/AuthContext";
import useLoadOptions from "../../hooks/useLoadOptions";

const RequestList = ({ dados, handleExcluir, handleEditar, isAdmin }) => {
  const { goTo } = useCustomNavigate();
  const { user } = useAuth();
  const { atualizarStatusSolicitacao } = useLoadOptions();
  
  const [designacaoStatus, setDesignacaoStatus] = useState({});

  const statusColor = (status) => {
    switch (status) {
      case 'enviado ao supervisor': return 'info';
      case 'visualizado': return 'success';
      default: return 'default';
    }
  };

  const handleChangeStatus = async (solicitacaoId, currentStatus) => {
    try {
      if (currentStatus !== 'visualizado') {
        await atualizarStatusSolicitacao(solicitacaoId, "VISUALIZADO");
        setDesignacaoStatus((prev) => ({ ...prev, [solicitacaoId]: true }));
        goTo('/supervisor/atividades/cadastrar');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>Histórico de Solicitações</Typography>
      {isAdmin && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => goTo(`/admin/solicitacoes/cadastrar`)}
          sx={{ mb: 2 }}
        >
          Cadastrar Solicitação
        </Button>
      )}

      <Box>
        {dados.map((solicitacao) => (
          <Card key={solicitacao.id} sx={{ mb: 2, width: '100%', maxWidth: 500, borderRadius: 2, boxShadow: 3, p: 2 }}>
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography variant="h6" color="textPrimary">Descrição:</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>{solicitacao.descricao}</Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Chip
                  label={solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}
                  color={statusColor(solicitacao.status)}
                  sx={{ fontSize: '0.875rem', height: '24px' }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                  {solicitacao.data_envio}
                </Typography>
              </Box>
            </CardContent>
            
            {isAdmin && (
              <CardActions sx={{ display: "flex", justifyContent: "flex-end", paddingBottom: 1 }}>
                <IconButton onClick={() => handleEditar(solicitacao.id)} color="primary" size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleExcluir(solicitacao.id)} color="error" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            )}
            
            {!isAdmin && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: solicitacao.status === 'visualizado' ? "#4CAF50" : "#FF9800", // Laranja
                    color: "#fff",
                    fontSize: "0.75rem",
                    padding: "4px 12px",
                    "&:hover": {
                      backgroundColor: solicitacao.status === 'visualizado' ? "#388E3C" : "#F57C00", // Tom mais escuro no hover
                    },
                  }}
                  onClick={() => handleChangeStatus(solicitacao.id, solicitacao.status)}
                  disabled={designacaoStatus[solicitacao.id]}
                  size="small"
                >
                  {solicitacao.status === 'visualizado' ? "Solicitação atendida" : "Designar atividade"}
                </Button>
              </Box>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RequestList;
