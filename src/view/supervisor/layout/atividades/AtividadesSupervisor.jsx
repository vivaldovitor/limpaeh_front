import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import ActivityCards from '@/components/card/ActivityCard';
import Header from '@/components/header/Header';

function AtividadesSupervisor() {
  const [atividades, setAtividades] = useState([]);
  const navigate = useNavigate();

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

  const handleExcluirAtividade = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta atividade?')) {
      try {
        await api.delete(`/atividade_limpeza/${id}`);
        setAtividades(atividades.filter((atividade) => atividade.id !== id));
        alert('Atividade excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir atividade:', error);
        alert('Não foi possível excluir a atividade.');
      }
    }
  };

  const handleEditarAtividade = (id) => {
    navigate(`/supervisor/atividades/editar/${id}`);
  };

  return (
    <>
      <Header titulo="Limpaeh - Atividades" />
      <ActivityCards
        dados={atividades}
        handleExcluir={handleExcluirAtividade}
        handleEditar={handleEditarAtividade}
        isAdmin={true}
      />
    </>
  );
}

export default AtividadesSupervisor;
