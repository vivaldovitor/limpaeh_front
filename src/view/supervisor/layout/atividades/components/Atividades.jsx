import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function AtividadesTableSupervisor({ atividades, handleExcluirAtividade }) {
  return (
    <TableComponent
      dados={atividades}
      handleExcluir={handleExcluirAtividade}
      tipo="Atividades"
      cadastrarUrl="/supervisor/atividades/cadastrar" 
      editarUrl="/supervisor/atividades/editar"
      isAdmin={true}
    />
  );
}

export default AtividadesTableSupervisor;
