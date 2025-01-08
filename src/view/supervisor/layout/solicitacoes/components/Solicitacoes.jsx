import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function SolicitacoesTable({ solicitacoes, handleExcluirSolicitacao }) {
  return (
    <TableComponent
      dados={solicitacoes}
      handleExcluir={handleExcluirSolicitacao}
      tipo="Solicitações"
      cadastrarUrl="/supervisor/solicitacoes/cadastrar"
      editarUrl="/supervisor/solicitacao/editar"
      isAdmin={false}
    />
  );
}

export default SolicitacoesTable;
