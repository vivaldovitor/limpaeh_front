import { useEffect } from 'react'; // Remova a importação de React desnecessária
import { useAuth } from '../../context/AuthContext';
import useCustomNavigate from '../../hooks/useCustomNavigate.js';

const LogoutPage = () => {
  const { logout } = useAuth();
  const { goTo } = useCustomNavigate();

  useEffect(() => {
    logout();
    setTimeout(() => {
      goTo('/login');
    }, 500);  // Delay de 0.5 segundo antes de redirecionar
  }, [goTo, logout]);

  return <div>Desconectando...</div>;
};

export default LogoutPage;
