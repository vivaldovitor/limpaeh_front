import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function FuncionariosTable({ funcionarios, handleExcluirFuncionario }) {
  return (
    <TableComponent
      dados={funcionarios}
      handleExcluir={handleExcluirFuncionario}
      tipo="Funcionários"
      cadastrarUrl="/admin/funcionarios/cadastrar"
      editarUrl="/admin/funcionario/editar"
      isAdmin={true}
    />
  );
}

export default FuncionariosTable;
