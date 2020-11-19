import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthState } from './context/auth/AuthState';
import { AlertsState } from './context/alerts/AlertsState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertsState>
        <App />
      </AlertsState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
