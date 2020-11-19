import React from 'react';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { Alerts } from './components/Alerts';
import { useAuthState } from './hooks/useAuthState';

const App = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <div className="App">
      <Alerts />
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
