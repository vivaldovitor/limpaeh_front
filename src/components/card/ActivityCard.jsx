import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Button, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledCard, CardTitle } from '/src/styles/CardStyles';
import { StyledButton } from '/src/styles/Toolbar.js';
import useLoadOptions from '../../hooks/useLoadOptions';
import useCustomNavigate from '../../hooks/useCustomNavigate';

function ActivityCards({ dados, handleExcluir, handleEditar, isAdmin }) {
  
  const { goTo } = useCustomNavigate();
  const { funcionarios } = useLoadOptions();

  const funcionarioNomes = dados.map(dado => {
    const funcionario = funcionarios.find(func => func.id === dado.funcionario_id);
    return funcionario ? funcionario.nome : 'Desconhecido';
  });  

  const statusColor = (status) => {
    switch (status) {
      case 'pendente':
        return 'warning';
      case 'em andamento':
        return 'info';
      case 'finalizado':
        return 'success';
      default:
        return 'default';
    }
  };  

  return (
    <Box sx={{ padding: '20px' }}>
      {isAdmin && (
        <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
          <Link to="/supervisor/atividades/cadastrar">
            <StyledButton variant="contained" color="primary">
              Cadastrar Atividade
            </StyledButton>
          </Link>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {dados.length === 0 ? (
          <Typography variant="h6">Nenhuma atividade disponível.</Typography>
        ) : (
          dados.map((atividade, index) => (
            <StyledCard key={atividade.id}>
              <CardContent>
                <CardTitle>{atividade.status === 'pendente' || atividade.status === 'em andamento' ? "Nova atividade" : "Atividade concluida"}</CardTitle>
    
                <TableContainer component={Paper} sx={{ boxShadow: 'none', marginBottom: '10px' }}>
                  <Table size="small" aria-label="atividade detalhes">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Funcionário</strong></TableCell>
                        <TableCell>{funcionarioNomes[index]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Situação</strong>
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                          <Chip
                            label={atividade.status.charAt(0).toUpperCase() + atividade.status.slice(1)}
                            color={statusColor(atividade.status)}
                            sx={{
                              margin: '0 auto',
                              fontSize: '0.875rem',
                              height: '24px',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Descrição</strong></TableCell>
                        <TableCell>{atividade.descricao}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                {atividade.status === 'pendente' && !isAdmin && (
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={() => goTo(`/funcionario/atividades/relatorios/cadastrar/${atividade.id}`)}
                >
                  Ir para relatório
                </Button>
                
                )}
                {atividade.status === 'finalizado' && !isAdmin && (
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => goTo(`/funcionario/relatorios`)}
                >
                  Ver relatório
                </Button>
                
                )}
                {isAdmin && (
                  <>
                    <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1976d2", color: "#fff" }}
                    onClick={() => handleEditar(atividade.id)}
                    aria-label={`Editar atividade ${atividade.id}`}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#d32f2f", color: "#fff" }}
                    onClick={() => handleExcluir(atividade.id)}
                    aria-label={`Excluir atividade ${atividade.id}`}
                  >
                    Excluir
                  </Button>

                  </>
                )}
              </Box>
            </StyledCard>
          ))
        )}
      </Box>
    </Box>
  );
}

ActivityCards.propTypes = {
  dados: PropTypes.array.isRequired,
  handleExcluir: PropTypes.func.isRequired,
  handleEditar: PropTypes.func,
  isAdmin: PropTypes.bool,
};

ActivityCards.defaultProps = {
  handleEditar: null,
  isAdmin: false,
};

export default ActivityCards;
