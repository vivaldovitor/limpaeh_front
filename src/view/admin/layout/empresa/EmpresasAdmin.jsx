import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import EmpresasTable from './components/Empresas';
import ExcluirItem from '../excluir';
import Header from '../../../../components/header/Header';

function EmpresasAdmin() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await api.get('/empresas');
        if (Array.isArray(response.data.empresas)) {
          setEmpresas(response.data.empresas);
        } else {
          console.error('A resposta da API não contém um array de empresas');
        }
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleExcluirEmpresa = (id) => {
    ExcluirItem(id, '/empresa', setEmpresas, empresas);
  };

  return (
    <>
    <Header titulo="Limpaeh - Empresas"/>
    <EmpresasTable 
      empresas={empresas} 
      handleExcluirEmpresa={handleExcluirEmpresa}
    />
    </>
  );
}

export default EmpresasAdmin;
