import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogout = () => {
      const alumniData = localStorage.getItem('alumni');
      if (!alumniData) {
        navigate('/login', { replace: true });
      }
    };

    handleLogout();

    const handlePopState = () => {
      handleLogout();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
};

export default useAuthRedirect;