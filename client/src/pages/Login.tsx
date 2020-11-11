import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useAuthState } from '../context/auth/useAuthState';

const githubURI =
  'https://github.com/login/oauth/authorize?client_id=560ee4521b0387f7017e';

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <main className={classes.container}>
      <Typography variant="h4" component="h1">
        Github Issues Teleport
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        href={githubURI}
        startIcon={<GitHubIcon />}
      >
        Sign In With GitHub
      </Button>
    </main>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: `${theme.spacing(3)}px`,
    },
  })
);
