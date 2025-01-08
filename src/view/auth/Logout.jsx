import { useEffect } from 'react'; // Remova a importação de React desnecessária
import { useAuth } from '../../context/AuthContext';
import useCustomNavigate from '../../hooks/useCustomNagivate.js';

const LogoutPage = () => {
  const { logout } = useAuth();
  const { goTo } = useCustomNavigate();

  useEffect(() => {
    logout();
    goTo('/login');
  }, [goTo, logout]);

  return <div>Desconectando...</div>;
};

export default LogoutPage;
