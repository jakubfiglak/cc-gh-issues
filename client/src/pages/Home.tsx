import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthState } from '../context/auth/useAuthState';
import { useAuthorization } from '../hooks/useAuthorization';

export const Home = () => {
  useAuthorization();
  const { authenticate, loading } = useAuthState();

  const location = useLocation();
  const code = location.search.split('?code=')[1];

  useEffect(() => {
    if (code) {
      authenticate(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Home</div>;
};
