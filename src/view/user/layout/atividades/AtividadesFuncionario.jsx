import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import ActivityCards from '@/components/card/ActivityCard';
import Header from '@/components/header/Header';
import { useAuth } from '@/context/AuthContext';

function AtividadesFuncionario() {
  const [atividades, setAtividades] = useState([]);
  const { user } = useAuth(); // Obtém o usuário logado, incluindo o ID

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await api.get('/atividades_limpeza');
        if (Array.isArray(response.data.atividades)) {
          // Filtra as atividades para mostrar apenas as atribuídas ao funcionário logado
          const atividadesFiltradas = response.data.atividades.filter(
            (atividade) => atividade.funcionario_id === user.id
          );
          setAtividades(atividadesFiltradas);
        } else {
          console.error('A resposta da API não contém um array de atividades');
        }
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      }
    };

    if (user) {
      fetchAtividades();
    }
  }, [user]);

  const handleExcluirAtividade = (id) => {
    ExcluirItem(id, '/atividade_limpeza', setAtividades, atividades);
  };

  return (
    <>
      <Header titulo="Limpaeh - Minhas Atividades" />
      <ActivityCards
        dados={atividades}
        handleExcluir={handleExcluirAtividade}
        tipo="Atividades"
        cadastrarUrl="/funcionario/atividades/cadastrar"
        editarUrl="/funcionario/atividades/editar"
        isAdmin={false}
      />
    </>
  );
}

export default AtividadesFuncionario;
