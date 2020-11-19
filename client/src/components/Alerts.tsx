import React from 'react';
import { makeStyles, Slide, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAlertsState } from '../hooks/useAlertsState';

export const Alerts = () => {
  const classes = useStyles();
  const { alerts } = useAlertsState();

  return (
    <div className={classes.container}>
      {alerts.map((alert) => {
        const { id, isVisible, type, msg } = alert;

        return (
          <Slide
            key={id}
            in={isVisible}
            direction="down"
            mountOnEnter
            unmountOnExit
          >
            <Alert severity={type} variant="filled">
              {msg}
            </Alert>
          </Slide>
        );
      })}
    </div>
  );
};

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'fixed',
    top: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(1)}px`,
    zIndex: 5000,
  },
}));
