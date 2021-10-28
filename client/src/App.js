import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Container>
        <Route exact path='/' component={Home} />
      </Container>
    </Router>
  );
}

export default App;
