import React, { FC } from 'react';
import {
  CssBaseline,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { NavBar } from '../components/NavBar';

export const MainTemplate: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <NavBar />
      <main className={classes.root}>{children}</main>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      gap: `${theme.spacing(2)}px`,
    },
  })
);
