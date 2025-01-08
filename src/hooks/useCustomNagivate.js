import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return { goTo };
};

export default useCustomNavigate;
