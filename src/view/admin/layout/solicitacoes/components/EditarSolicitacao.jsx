import React from 'react';
import { useParams } from 'react-router-dom';
import EditarForm from '../../../../../components/form/EditarForm';

function EditarSolicitacao({ onUpdate }) {
  const { solicitacaoId } = useParams();

  const fields = [
    {
      name: 'descricao',
      label: 'Descrição',
      type: 'text',
    },
    { name: 'setor_admin_id', label: 'Administrador', type: 'select', optionsUrl: '/funcionarios'},
    {
      name: 'supervisor_id',
      label: 'Supervisor',
      type: 'select',
      optionsUrl: '/funcionarios',
    },
  ];

  return (
    <EditarForm
      fields={fields}
      submitUrl="solicitacao"
      successMessage="Solicitação atualizada com sucesso!"
      errorMessage="Erro ao atualizar a solicitação."
      id={solicitacaoId}
      onSubmit={onUpdate}
    />
  );
}

export default EditarSolicitacao;
