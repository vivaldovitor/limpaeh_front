import React from 'react';
import CadastroForm from '@/components/form/CadastroForm';

function CadastrarAtividade() {
  const fields = [
    { name: 'descricao', label: 'Descrição' },
    { name: 'ambiente_id', label: 'Ambiente', type: 'select' },
    { name: 'funcionario_id', label: 'Funcionário', type: 'select' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/atividades_limpeza"
      successMessage="Atividade cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar atividade"
      cancelUrl="/supervisor/atividades"
    />
  );
}

export default CadastrarAtividade;
