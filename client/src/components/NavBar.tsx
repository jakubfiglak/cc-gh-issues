import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAuthState } from '../context/auth/useAuthState';

export const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuthState();

  const onLogout = () => {
    history.push('/login');
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            GitHub Issues Teleport
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
