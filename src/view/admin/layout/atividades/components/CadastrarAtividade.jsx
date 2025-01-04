import React from 'react';
import CadastroForm from '../../../../../components/form/CadastroForm';

function CadastrarAtividade() {
  const fields = [
    { name: 'solicitacao_id', label: 'Solicitação Administrativa', type: 'select'},
    { name: 'descricao', label: 'Descrição' },
    { name: 'data_horario_inicio', label: 'Data e Horário de Início', type: 'datetime-local' },
    { name: 'ambiente_id', label: 'Ambiente', type: 'select' },
    { name: 'funcionario_id', label: 'Funcionário', type: 'select' }
  ];

  return (
    <CadastroForm
      fields={fields}
      submitUrl="/atividades_limpeza"
      successMessage="Atividade cadastrada com sucesso!"
      errorMessage="Erro ao cadastrar atividade"
    />
  );
}

export default CadastrarAtividade;
