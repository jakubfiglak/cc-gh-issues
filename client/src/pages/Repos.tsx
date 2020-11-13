import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { QueryStatus } from 'react-query';
import { MainTemplate } from '../templates/MainTemplate';
import { Loader } from '../components/Loader';
import { RepoCard } from '../components/RepoCard';
import { useRepos } from '../hooks/useRepos';
import { useAuthState } from '../hooks/useAuthState';

export const Repos = () => {
  const classes = useStyles();
  const { user } = useAuthState();

  const { data, status } = useRepos(user?.repos_url!);
  const { Loading, Error } = QueryStatus;

  return (
    <MainTemplate>
      {status === Loading && <Loader />}
      <Typography variant="h5" align="center">
        Your repos
      </Typography>
      <div className={classes.container}>
        {status === Error && (
          <Typography variant="body1" color="error">
            Sorry, something went wrong when fetching repos
          </Typography>
        )}
        {data && data.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
      </div>
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      justifyItems: 'center',
      gap: `${theme.spacing(2)}px`,
      width: '100%',
      maxWidth: 1000,
      padding: theme.spacing(0, 2),
    },
  })
);
