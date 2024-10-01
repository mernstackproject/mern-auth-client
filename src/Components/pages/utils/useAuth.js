import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from './tokenValidator';
const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth');
      if (!token) {
        navigate('/login', {replace:true});
      } else {
        const isValid = await validateToken(token); 
        if (!isValid) {
          localStorage.removeItem('auth');  
          navigate('/login', {replace:true});
        }
      }
    };
    checkAuth();  
  }, [navigate]);
};

export default useAuth;
