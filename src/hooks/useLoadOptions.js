import { useState, useEffect } from 'react';
import api from '../services/api';

function useLoadOptions() {
  const [tipos, setTipos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [setor_admin, setSetorAdmin] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [tiposResponse, empresasResponse, funcionariosResponse, ambientesResponse, solicitacoesResponse] = await Promise.all([
          api.get('/tipos_funcionarios'),
          api.get('/empresas'),
          api.get('/funcionarios'),
          api.get('/ambientes'),
          api.get('/solicitacoes')
        ]);

        setTipos(tiposResponse.data.tipos_funcionarios || []);
        setEmpresas(empresasResponse.data.empresas || []);
        setFuncionarios(funcionariosResponse.data.funcionarios || []);
        setSupervisores(funcionariosResponse.data.funcionarios.filter(f => f.tipo.descricao === 'supervisor'));
        setAmbientes(ambientesResponse.data.ambientes || []);
        setSetorAdmin(funcionariosResponse.data.funcionarios.filter(f => f.tipo.descricao === 'admin'));
        setSolicitacoes(solicitacoesResponse.data.solicitacoes || []);
      } catch (err) {
        setError('Erro ao carregar as opções');
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  return { tipos, empresas, funcionarios, supervisores, setor_admin, ambientes, solicitacoes, loadingOptions, error };
}

export default useLoadOptions;
