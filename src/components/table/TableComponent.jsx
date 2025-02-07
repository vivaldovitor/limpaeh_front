import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { StyledButton } from '@/styles/Toolbar';
import api from '@/services/api';

function TableComponent({ dados, setDados, handleExcluir, tipo, cadastrarUrl, editarUrl, isAdmin }) {
  const colunas = Object.keys(dados[0] || {}).map((key) => key.charAt(0).toUpperCase() + key.slice(1));
    
  const confirmarExclusao = async (id) => {
    
      if (window.confirm('Tem certeza que deseja excluir este item?')) {
        try {
          await api.delete(`${handleExcluir}/${id}`);
          setDados(dados.filter((item) => item.id !== id));
          alert(`${handleExcluir} excluído com sucesso!`);
        } catch (error) {
          console.error(`Erro ao excluir ${tipo.toLowerCase()}:`, error);
          alert(`Não foi possível excluir o ${tipo.toLowerCase()}.`);
        }
      }
    };
     

  const renderCellValue = (valor) => {
    if (typeof valor === 'object' && valor !== null) {
      return valor.descricao || valor.nome || JSON.stringify(valor);
    }
    return valor;
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h2>{tipo}</h2>
      {isAdmin && cadastrarUrl && (
        <StyledButton variant="contained" color="primary" sx={{ marginBottom: '10px' }} component={Link} to={cadastrarUrl}>
          Cadastrar {tipo}
        </StyledButton>
      )}
      {dados.length === 0 ? (
        <p>Vazio</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {colunas.map((coluna) => (
                <TableCell key={coluna}>{coluna}</TableCell>
              ))}
              {isAdmin && <TableCell>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {dados.map((item) => (
              <TableRow key={item.id}>
                {Object.entries(item).map(([_, valor], index) => (
                  <TableCell key={index}>{renderCellValue(valor)}</TableCell>
                ))}
                {isAdmin && (
                  <TableCell>
                    <Button variant="outlined" color="secondary" sx={{ marginRight: '10px' }} component={Link} to={`${editarUrl}/${item.id}`}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => confirmarExclusao(item.id)}>
                      Excluir
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

TableComponent.propTypes = {
  dados: PropTypes.array.isRequired,
  handleExcluir: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  cadastrarUrl: PropTypes.string,
  editarUrl: PropTypes.string.isRequired,
};

export default TableComponent;
