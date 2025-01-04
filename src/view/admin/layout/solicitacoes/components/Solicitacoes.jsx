import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function SolicitacoesTable({ solicitacoes, handleExcluirSolicitacao }) {
  return (
    <TableComponent
      dados={solicitacoes}
      handleExcluir={handleExcluirSolicitacao}
      tipo="Solicitação"
      cadastrarUrl="/admin/solicitacoes/cadastrar"
      editarUrl="/admin/solicitacao/editar"
    />
  );
}

export default SolicitacoesTable;
