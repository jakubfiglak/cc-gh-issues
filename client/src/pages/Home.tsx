import React from 'react';
import { Typography } from '@material-ui/core';
import { ProfileCard } from '../components/ProfileCard';
import { useAuthState } from '../hooks/useAuthState';

export const Home = () => {
  const { user } = useAuthState();

  return (
    <>
      <Typography variant="h5" align="center">
        Welcome {user?.name}
      </Typography>
      <ProfileCard user={user!} />
    </>
  );
};
