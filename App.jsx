import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Route exact path="/" render={() => (<Redirect to="/login" />)} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default App;
