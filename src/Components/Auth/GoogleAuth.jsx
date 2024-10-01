import { GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import { onError } from './services/OnchangeService';
import React from 'react';
import { googleAuth } from './services/Api';
import { useNavigate } from 'react-router-dom';
const GoogleAuth = () => {
  const navigate = useNavigate()
  const handleGoogleLogin = async (response) => {
    await googleAuth(response, navigate);
  };
  return (
    <GoogleOAuthProvider  clientId={process.env.REACT_APP_CLIENT_ID}>
      <div className="google-login">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={onError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
