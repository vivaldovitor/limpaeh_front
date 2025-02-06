import React from 'react';
import { useParams } from 'react-router-dom';
import EditarForm from '@/components/form/EditarForm';

function EditarAmbiente({ onUpdate }) {
  const { ambienteId } = useParams();

  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'descricao', label: 'Descrição' }
  ];

  return (
    <EditarForm
      fields={fields}
      submitUrl="/ambiente"
      successMessage="Ambiente atualizado com sucesso!"
      errorMessage="Erro ao atualizar a ambiente."
      id={ambienteId}
      onSubmit={onUpdate}
      cancelUrl="/admin/ambientes"
    />
  );
}

export default EditarAmbiente;
