import React, { useEffect } from 'react';
import { CssBaseline, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Repos } from '../components/Repos';
import { useAuthState } from '../context/auth/useAuthState';
import { useAuthorization } from '../hooks/useAuthorization';

export const Home = () => {
  useAuthorization();
  const { authenticate, loading, user } = useAuthState();

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

  return (
    <main>
      <CssBaseline />
      <NavBar />
      <Typography variant="h5" align="center">
        Welcome {user?.login}
      </Typography>
      <Repos />
    </main>
  );
};
