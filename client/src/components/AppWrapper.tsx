import React, { FC } from 'react';
import { useAuthState } from '../context/auth/useAuthState';

export const AppWrapper: FC = ({ children }) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this page</div>;
  }

  return <main>{children}</main>;
};
