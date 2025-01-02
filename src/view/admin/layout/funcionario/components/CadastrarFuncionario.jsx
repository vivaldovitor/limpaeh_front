import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarFuncionario() {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'senha', label: 'Senha', type: 'password' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/funcionarios"
      successMessage="Funcionário cadastrado com sucesso!"
      errorMessage="Erro ao cadastrar funcionário"
    />
  );
}

export default CadastrarFuncionario;
