import React from 'react';
import { CssBaseline, Typography } from '@material-ui/core';
import { NavBar } from '../components/NavBar';
import { useAuthState } from '../hooks/useAuthState';
import { useRepos } from '../hooks/useRepos';

export const Home = () => {
  const { authenticate, loading, user } = useAuthState();

  const { data } = useRepos(user?.repos_url!);

  return (
    <main>
      <CssBaseline />
      <NavBar />
      <Typography variant="h5" align="center">
        Welcome {user?.login}
      </Typography>
      <Typography>{user?.avatar_url}</Typography>
      <Typography>{user?.repos_url}</Typography>
      {data?.map((repo) => (
        <h5>{repo.name}</h5>
      ))}
    </main>
  );
};
