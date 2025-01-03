import React from 'react';
import { useParams } from 'react-router-dom';
import EditarForm from '../../../../../components/form/EditarForm';

function EditarFuncionario({ onUpdate }) {
  const { funcionarioId } = useParams();

  const fields = [
    {
      name: 'nome',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      optionsUrl: '/tipos_funcionarios',
    },
    {
      name: 'empresa',
      label: 'Empresa',
      type: 'select',
      optionsUrl: '/empresas',
    },
  ];
  

  return (
    <EditarForm
      fields={fields}
      submitUrl="funcionario"
      successMessage="Funcionário atualizado com sucesso!"
      errorMessage="Erro ao atualizar o funcionário."
      id={funcionarioId}
      onSubmit={onUpdate}
    />
  );
}

export default EditarFuncionario;
