import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import AtividadesTableSupervisor from './components/Atividades';
import ExcluirItem from '../excluir';
import Header from '../../../../components/header/Header';

function AtividadesSupervisor() {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await api.get('/atividades_limpeza');
        if (Array.isArray(response.data.atividades)) {
          setAtividades(response.data.atividades);
        } else {
          console.error('A resposta da API não contém um array de atividades');
        }
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      }
    };

    fetchAtividades();
  }, []);

  const handleExcluirAtividade = (id) => {
    ExcluirItem(id, '/atividade_limpeza', setAtividades, atividades);
  };

  return (
    <>
      <Header titulo="Limpaeh - Atividades"/>
      <AtividadesTableSupervisor 
        atividades={atividades} 
        handleExcluirAtividade={handleExcluirAtividade}
      />
    </>
  );
}

export default AtividadesSupervisor;
