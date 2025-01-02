import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarEmpresa() {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'nomeFantasia', label: 'Nome Fantasia' },
    { name: 'cnpj', label: 'CNPJ' },
    { name: 'contato', label: 'Contato' },
    { name: 'endereco', label: 'Endereço' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/empresa"
      successMessage="Empresa cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar empresa"
    />
  );
}

export default CadastrarEmpresa;
