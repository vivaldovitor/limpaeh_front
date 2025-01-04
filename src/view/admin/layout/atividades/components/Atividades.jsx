import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function AtividadesTable({ atividades, handleExcluirAtividade }) {
  return (
    <TableComponent
      dados={atividades}
      handleExcluir={handleExcluirAtividade}
      tipo="Atividade"
      cadastrarUrl="/admin/atividades/cadastrar"
      editarUrl="/admin/atividades/editar"
    />
  );
}

export default AtividadesTable;
