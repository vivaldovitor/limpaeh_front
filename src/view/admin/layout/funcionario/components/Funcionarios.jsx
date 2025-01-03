import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function FuncionariosTable({ funcionarios, handleExcluirFuncionario }) {
  return (
    <TableComponent
      dados={funcionarios}
      handleExcluir={handleExcluirFuncionario}
      tipo="Funcionário"
      cadastrarUrl="/admin/funcionarios/cadastrar"
      editarUrl="/admin/funcionario/editar"
    />
  );
}

export default FuncionariosTable;
