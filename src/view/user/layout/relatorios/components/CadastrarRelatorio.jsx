import React from "react";
import ReportsPage from "@/pages/ReportsPage";

function CadastrarRelatorio() {
  const fields = [
    { name: 'descricao', label: 'Descrição' },
    { name: 'observacao', label: 'Observação' }
  ];

  return <ReportsPage fields={fields} submitUrl="/relatorios" />;
}

export default CadastrarRelatorio;
