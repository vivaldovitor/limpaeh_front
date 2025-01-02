import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

function TableComponent({ dados, handleExcluir, tipo, cadastrarUrl, editarUrl }) {
  const colunas = Object.keys(dados[0] || {}).map((key) =>
    key.charAt(0).toUpperCase() + key.slice(1)
  );

  return (
    <Box sx={{ padding: '20px' }}>
      <h2>{tipo} Cadastrados</h2>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: '10px' }}
        component={Link}
        to={cadastrarUrl}
      >
        Cadastrar Novo {tipo}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            {colunas.map((coluna) => (
              <TableCell key={coluna}>{coluna}</TableCell>
            ))}
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((item) => (
            <TableRow key={item.id}>
              {Object.entries(item).map(([chave, valor], index) => (
                <TableCell key={index}>
                  {typeof valor === 'object' && valor !== null
                    ? valor.descricao // Exibe a propriedade 'descricao' de objetos
                    : valor}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ marginRight: '10px' }}
                  component={Link}
                  to={`${editarUrl}/${item.id}`}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleExcluir(item.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TableComponent;
