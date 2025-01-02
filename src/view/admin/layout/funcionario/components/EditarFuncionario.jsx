import React from 'react';
import EditarForm from '../../../../../components/form/EditarForm';

function EditarFuncionario({ funcionarioId, onUpdate }) {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'email', label: 'Email' },
    { name: 'senha', label: 'Senha', type: 'password' },
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
