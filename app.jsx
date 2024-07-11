import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Route path="/login">
        {user ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
      </Route>
      <Route path="/dashboard">
        {user ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Router>
  );
};

export default App;
