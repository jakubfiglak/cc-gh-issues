import React from 'react';
import { Typography } from '@material-ui/core';
import { ProfileCard } from '../components/ProfileCard';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

export const Home = () => {
  const user = useAuthenticatedUser();

  return (
    <>
      <Typography variant="h5" align="center">
        Welcome {user.name}
      </Typography>
      <ProfileCard user={user} />
    </>
  );
};
