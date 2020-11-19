import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';

export const UnauthenticatedApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};
