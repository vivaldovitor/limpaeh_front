import React from 'react';
import { useParams } from 'react-router-dom';
import EditarForm from '@/components/form/EditarForm';

function EditarAtividade({ onUpdate }) {
  const { atividadeId } = useParams();

  const fields = [
    { name: 'solicitacao_id', label: 'Solicitação Administrativa', type: 'select'},
    { name: 'descricao', label: 'Descrição' },
    { name: 'ambiente_id', label: 'Ambiente', type: 'select' },
    { name: 'funcionario_id', label: 'Funcionário', type: 'select' }
  ];

  return (
    <EditarForm
      fields={fields}
      submitUrl="/atividade_limpeza"
      successMessage="Atividade atualizada com sucesso!"
      errorMessage="Erro ao atualizar a atividade."
      id={atividadeId}
      onSubmit={onUpdate}
      cancelUrl="/supervisor/atividades"
    />
  );
}

export default EditarAtividade;
