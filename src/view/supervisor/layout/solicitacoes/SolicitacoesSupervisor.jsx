import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import RequestList from '@/components/timeline/RequestList';
import Header from '@/components/header/Header';

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
    <RequestList
      dados={solicitacoes}
      isAdmin={false}
    />
    </>
  );
}

export default SolicitacoesSupervisor;
