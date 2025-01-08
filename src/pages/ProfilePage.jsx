import React, { useEffect, useState } from 'react';
import UserProfile from '../components/profile/Profile'; 
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function ProfilePage() {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/funcionario/${user.id}`);
        const userData = response.data;

        let empresaNome = "Empresa não especificada";
        if (userData.empresa_id) {
          const empresaResponse = await api.get(`/empresa/${userData.empresa_id}`);
          empresaNome = empresaResponse.data.nome;
        }

        setUserDetails({ ...userData, empresaNome });
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  if (loadingDetails) {
    return <p>Carregando detalhes do perfil...</p>;
  }

  const getFuncao = () => {
    if (user.isAdmin) return "Administrador";
    if (user.isSupervisor) return "Supervisor";
    return "Funcionário";
  };

  return (
    <UserProfile
      nome={userDetails?.nome || "Usuário Desconhecido"}
      email={user.email}
      funcao={getFuncao()}
      empresa={userDetails?.empresaNome}
    />
  );
}

export default ProfilePage;
