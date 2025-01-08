import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import SolicitacoesTable from '../../../supervisor/layout/solicitacoes/components/Solicitacoes';
import ExcluirItem from '../excluir';
import Header from '../../../../components/header/Header';

function SolicitacoesSupervisor() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await api.get('/solicitacoes');
        if (Array.isArray(response.data.solicitacoes)) {
          setSolicitacoes(response.data.solicitacoes);
        } else {
          console.error('A resposta da API não contém um array de solicitações');
        }
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
      }
    };

    fetchSolicitacoes(); 
  }, []); 

  const handleExcluirSolicitacao = (id) => {
    ExcluirItem(id, '/solicitacao', setSolicitacoes, solicitacoes);
  };

  return (
    <>
    <Header titulo="Limpaeh - Solicitações"/>
    <SolicitacoesTable 
      solicitacoes={solicitacoes} 
      handleExcluirSolicitacao={handleExcluirSolicitacao}
    />
    </>
  );
}

export default SolicitacoesSupervisor;
