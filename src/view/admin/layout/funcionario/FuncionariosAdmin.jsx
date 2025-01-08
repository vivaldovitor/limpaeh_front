import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import FuncionariosTable from './components/Funcionarios';
import ExcluirItem from '../excluir';
import Header from '../../../../components/header/Header';

function FuncionariosAdmin() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/funcionarios');
        if (Array.isArray(response.data.funcionarios)) {
          setFuncionarios(response.data.funcionarios);
        } else {
          console.error('A resposta da API não contém um array de funcionários');
        }
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
      }
    };

    fetchFuncionarios(); 
  }, []); 

  const handleExcluirFuncionario = (id) => {
    ExcluirItem(id, '/funcionario', setFuncionarios, funcionarios);
  };

  return (
    <>
    <Header titulo="Limpaeh - Funcionários"/>
    <FuncionariosTable 
      funcionarios={funcionarios} 
      handleExcluirFuncionario={handleExcluirFuncionario}
    />
    </>
  );
}

export default FuncionariosAdmin;
