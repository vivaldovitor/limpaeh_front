import React from 'react';
import TableComponent from '../../../../../components/table/TableComponent';

function EmpresasTable({ empresas, handleExcluirEmpresa }) {
  return (
    <TableComponent
      dados={empresas}
      handleExcluir={handleExcluirEmpresa}
      tipo="Empresa"
      cadastrarUrl="/admin/empresas/cadastrar"
      editarUrl="/admin/empresa/editar"
    />
  );
}

export default EmpresasTable;
