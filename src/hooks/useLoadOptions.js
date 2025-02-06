import { useState, useEffect } from "react";
import api from "../services/api";

function useLoadOptions() {
  const [tipos, setTipos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [
          tiposResponse,
          empresasResponse,
          funcionariosResponse,
          ambientesResponse,
          solicitacoesResponse,
          relatoriosResponse,
          atividadesResponse,
        ] = await Promise.all([
          api.get("/tipos_funcionarios"),
          api.get("/empresas"),
          api.get("/funcionarios"),
          api.get("/ambientes"),
          api.get("/solicitacoes"),
          api.get("/relatorios"),
          api.get("/atividades_limpeza")
        ]);

        setTipos(tiposResponse.data.tipos_funcionarios || []);
        setEmpresas(empresasResponse.data.empresas || []);
        setFuncionarios(funcionariosResponse.data.funcionarios || []);
        setSupervisores(
          funcionariosResponse.data.funcionarios.filter(
            (f) => f.tipo.descricao === "supervisor"
          )
        );
        setAmbientes(ambientesResponse.data.ambientes || []);
        setAdmin(
          funcionariosResponse.data.funcionarios.filter(
            (f) => f.tipo.descricao === "admin"
          )
        );
        setSolicitacoes(solicitacoesResponse.data.solicitacoes || []);
        setRelatorios(relatoriosResponse.data.relatorios || []);
        setAtividades(atividadesResponse.data.atividades_limpeza || []);
      } catch (err) {
        setError("Erro ao carregar as opções");
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  const finalizarAtividade = async (relatorioId) => {
    try {
      const response = await api.post(`/finalizar_atividade/${relatorioId}`);
      if (response.status === 200) {
        setRelatorios((prevRelatorios) =>
          prevRelatorios.filter((r) => r.id !== relatorioId)
        ); 
      }
    } catch (error) {
      console.error("Erro ao finalizar atividade:", error);
    }
  };

  const enviarRelatorio = async (novoRelatorio) => {
    try {
      const response = await api.post("/relatorios", novoRelatorio);
      if (response.status === 201) {
        setRelatorios((prevRelatorios) => [...prevRelatorios, response.data]);
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao enviar relatório:", error);
      throw error;
    }
  };
  
  const atualizarStatusAtividade = async (atividadeId, novoStatus) => {
    
    try {
      const response = await api.put(`/atividade_limpeza/${atividadeId}`, {
        status: novoStatus,
      });
      if (response.status === 200) {
        setAtividades((prevAtividades) =>
          prevAtividades.map((a) =>
            a.id === atividadeId ? { ...a, status: novoStatus } : a
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status da atividade:", error);
    }
  };
  
  const atualizarStatusSolicitacao = async (solicitacaoId, novoStatus) => {
    
    try {
      const response = await api.put(`/solicitacao/${solicitacaoId}`, {
        status: novoStatus,
      });
      if (response.status === 200) {
        setSolicitacoes((prevSolicitacoes) =>
          prevSolicitacoes.map((s) =>
            s.id === solicitacaoId ? { ...s, status: novoStatus } : s
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status da solicitação:", error);
    }
  };

  return {
    tipos,
    empresas,
    funcionarios,
    supervisores,
    admin,
    ambientes,
    solicitacoes,
    relatorios,
    atividades,
    loadingOptions,
    error,
    finalizarAtividade,
    enviarRelatorio,
    atualizarStatusAtividade,
    atualizarStatusSolicitacao,
  };
}

export default useLoadOptions;
