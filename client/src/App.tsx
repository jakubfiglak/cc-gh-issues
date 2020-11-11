import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthState } from './context/auth/AuthState';

function App() {
  return (
    <div className="App">
      <AuthState>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
