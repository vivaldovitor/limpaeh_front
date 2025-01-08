import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function EmpresasTable({ empresas, handleExcluirEmpresa }) {
  return (
    <TableComponent
      dados={empresas}
      handleExcluir={handleExcluirEmpresa}
      tipo="Empresas"
      cadastrarUrl="/admin/empresas/cadastrar"
      editarUrl="/admin/empresa/editar"
      isAdmin={true}
    />
  );
}

export default EmpresasTable;
