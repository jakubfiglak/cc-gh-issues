import React from 'react';
import { Typography } from '@material-ui/core';
import { ProfileCard } from '../components/ProfileCard';
import { useAuthState } from '../hooks/useAuthState';
import { MainTemplate } from '../templates/MainTemplate';

export const Home = () => {
  const { user } = useAuthState();

  return (
    <MainTemplate>
      <Typography variant="h5" align="center">
        Welcome {user?.name}
      </Typography>
      <ProfileCard
        name={user?.name!}
        login={user?.login!}
        avatar_url={user?.avatar_url!}
        bio={user?.bio!}
        url={user?.html_url!}
      />
    </MainTemplate>
  );
};
