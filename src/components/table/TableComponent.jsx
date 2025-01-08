import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

function TableComponent({ dados, handleExcluir, tipo, cadastrarUrl, editarUrl, isAdmin }) {
  const colunas = Object.keys(dados[0] || {}).map((key) => key.charAt(0).toUpperCase() + key.slice(1));

  const confirmarExclusao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      handleExcluir(id);
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
        <Button variant="contained" color="primary" sx={{ marginBottom: '10px' }} component={Link} to={cadastrarUrl}>
          Cadastrar {tipo}
        </Button>
      )}
      {dados.length === 0 ? (
        <p>Nenhum {tipo} encontrado.</p>
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
