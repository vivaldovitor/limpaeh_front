import React from "react";
import { useParams } from "react-router-dom";


function EditarRelatorio({ onUpdate }) {
    const {relatorioId} = useParams()

    const fields = [
        { name: 'descricao', label: 'Descrição' },
        { name: 'observacao', label: 'Observação' },
    ];

    return (
        <Form
        fields={fields}
        submitUrl="/relatorios"
        successMessage="Relatório atualizado com sucesso!"
        errorMessage="Erro ao atualizar a relatório."
        id={relatorioId}
        onSubmit={onUpdate}
        cancelUrl="/funcionario/atividades"
        />
    );
}

export default EditarRelatorio;
