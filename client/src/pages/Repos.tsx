import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { QueryStatus } from 'react-query';
import { Loader } from '../components/Loader';
import { RepoCard } from '../components/RepoCard';
import { useRepos } from '../hooks/useRepos';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';

export const Repos = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const { data, status } = useRepos(user.repos_url, user.public_repos);
  const { Loading, Error } = QueryStatus;

  if (status === Loading) {
    return <Loader />;
  }

  if (status === Error) {
    return (
      <Typography variant="body1" color="error">
        Sorry, something went wrong when fetching repos
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" align="center">
        Your repos
      </Typography>
      <div className={classes.container}>
        {data?.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </>
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
