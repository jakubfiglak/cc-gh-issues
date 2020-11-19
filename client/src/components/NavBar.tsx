import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';
import { AppMenu } from './AppMenu';
import { useAuthState } from '../hooks/useAuthState';

export const NavBar = () => {
  const classes = useStyles();
  const { logout } = useAuthState();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AppMenu />
          <Typography variant="h6" component="h1" className={classes.title}>
            GitHub Issues Teleport
          </Typography>
          <IconButton color="inherit" onClick={logout} aria-label="logout">
            <LogoutIcon />
          </IconButton>
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
    title: {
      flexGrow: 1,
    },
  })
);
