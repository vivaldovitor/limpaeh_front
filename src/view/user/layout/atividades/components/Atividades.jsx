import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function AtividadesTableFuncionario({ atividades, handleExcluirAtividade }) {
  return (
    <TableComponent
      dados={atividades}
      handleExcluir={handleExcluirAtividade}
      tipo="Atividades"
      cadastrarUrl="/funcionario/atividades/cadastrar" 
      editarUrl="/funcionario/atividades/editar"
      isAdmin={false}
    />
  );
}

export default AtividadesTableFuncionario;
