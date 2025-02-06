import RequestList from "@/components/timeline/RequestList";
import Header from '@/components/header/Header';
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

function SolicitacoesAdmin() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const navigate = useNavigate();

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
  
    const handleExcluirSolicitacao = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta solicitação?')) {
          try {
            await api.delete(`/solicitacao/${id}`);
            setSolicitacoes(solicitacoes.filter((solicitacao) => solicitacao.id !== id));
            alert('Solicitação excluída com sucesso!');
          } catch (error) {
            console.error('Erro ao excluir solicitação:', error);
            alert('Não foi possível excluir a solicitação.');
          }
        }
      };
    
      const handleEditarSolicitacao = (id) => {
        navigate(`/admin/solicitacoes/editar/${id}`);
      };

  return (
    <>
      <Header titulo="LimpAeh - Solicitações"/>
      <RequestList
      dados={solicitacoes}
      handleExcluir={handleExcluirSolicitacao}
      handleEditar={handleEditarSolicitacao}
      isAdmin={true}
      />
    </>
  )
}

export default SolicitacoesAdmin;
