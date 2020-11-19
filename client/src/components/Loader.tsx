import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';

export const Loader = () => {
  return (
    <Backdrop open>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
