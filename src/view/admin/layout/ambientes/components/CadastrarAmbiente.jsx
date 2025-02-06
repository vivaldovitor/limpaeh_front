import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarAmbiente() {
  const fields = [
    { name: 'nome', label: 'Nome' },
    { name: 'descricao', label: 'Descrição' },
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/ambientes"
      successMessage="Ambiente cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar ambiente"
      cancelUrl="/admin/ambientes"
    />
  );
}

export default CadastrarAmbiente;
