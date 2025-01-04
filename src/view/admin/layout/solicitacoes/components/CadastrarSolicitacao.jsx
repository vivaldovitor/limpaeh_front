import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarSolicitacao() {
  const fields = [
    { name: 'descricao', label: 'Descrição', type: 'text' },
    { name: 'setor_admin_id', label: 'Administrador', type: 'select'},
    { name: 'supervisor_id', label: 'Supervisor', type: 'select' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/solicitacoes"
      successMessage="Solicitação cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar solicitação."
    />
  );
}

export default CadastrarSolicitacao;
