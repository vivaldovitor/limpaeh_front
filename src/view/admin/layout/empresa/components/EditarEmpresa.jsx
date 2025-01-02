import React from 'react';
import EditarForm from './EditarForm';

function EditarEmpresa({ empresaId, onUpdate }) {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'nomeFantasia', label: 'Nome Fantasia' },
    { name: 'cnpj', label: 'CNPJ' },
    { name: 'contato', label: 'Contato' },
    { name: 'endereco', label: 'Endereço' },
  ];

  return (
    <EditarForm
      fields={fields}
      submitUrl="empresa"
      successMessage="Empresa atualizada com sucesso!"
      errorMessage="Erro ao atualizar a empresa."
      id={empresaId}
      onSubmit={onUpdate}
    />
  );
}

export default EditarEmpresa;
