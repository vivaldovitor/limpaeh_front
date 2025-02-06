import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarFuncionario() {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'senha', label: 'Senha', type: 'password' },
    { name: 'tipo_id', label: 'Tipo', type: 'select' },  
    { name: 'empresa_id', label: 'Empresa', type: 'select' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/funcionarios"
      successMessage="Funcionário cadastrado com sucesso!"
      errorMessage="Erro ao cadastrar funcionário"
      cancelUrl="/admin/funcionarios"
    />
  );
}

export default CadastrarFuncionario;
