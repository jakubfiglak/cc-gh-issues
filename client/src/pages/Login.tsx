import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { useAuthState } from '../hooks/useAuthState';

const githubURI = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user%20public_repo`;

export const Login = () => {
  const classes = useStyles();

  const { authenticate } = useAuthState();

  const history = useHistory();
  const location = useLocation();
  const code = location.search.split('?code=')[1];

  useEffect(() => {
    if (code) {
      authenticate(code);
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

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
