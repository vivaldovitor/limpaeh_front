import React from 'react';
import CadastroForm from '@/components/form/CadastroForm';

function CadastrarEmpresa() {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'nome_fantasia', label: 'Nome Fantasia' },
    { name: 'cnpj', label: 'CNPJ' },
    { name: 'contato', label: 'Contato' },
    { name: 'endereco', label: 'Endereço' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/empresas"
      successMessage="Empresa cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar empresa"
      cancelUrl="/admin/empresas"
    />
  );
}

export default CadastrarEmpresa;
