import React from 'react';
import { useParams } from 'react-router-dom';
import EditarForm from '@/components/form/EditarForm';

function EditarEmpresa({ onUpdate }) {
  const { empresaId } = useParams();

  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'nome_fantasia', label: 'Nome Fantasia' },
    { name: 'cnpj', label: 'CNPJ' },
    { name: 'contato', label: 'Contato' },
    { name: 'endereco', label: 'Endereço' },
  ];

  return (
    <EditarForm
      fields={fields}
      submitUrl="/empresa"
      successMessage="Empresa atualizada com sucesso!"
      errorMessage="Erro ao atualizar a empresa."
      id={empresaId}
      onSubmit={onUpdate}
      cancelUrl="/admin/empresas"
    />
  );
}

export default EditarEmpresa;
