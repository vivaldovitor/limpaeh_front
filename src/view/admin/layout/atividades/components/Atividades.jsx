import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function AtividadesTableAdmin({ atividades, handleExcluirAtividade }) {
  return (
    <TableComponent
      dados={atividades}
      handleExcluir={handleExcluirAtividade}
      tipo="Atividades"
      cadastrarUrl="/admin/atividades/cadastrar"
      editarUrl="/admin/atividades/editar"
      isAdmin={true}
    />
  );
}

export default AtividadesTableAdmin;
