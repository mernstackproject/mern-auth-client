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
        const result = await validateToken(token); 
        
        if (!result.isValid) {
         
          if (result.expired) {
            localStorage.removeItem('auth');
            navigate('/login', { replace: true });
          } else {
            navigate('/login', { replace: true });
          }
        }
      }
    };
    checkAuth();  
  }, [navigate]);
};

export default useAuth;
