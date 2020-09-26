import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import Textbox from './textbox.js';
import Home from './home.js';

function App() {
 
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" component = { Home }/>
        <Route path="/:id" children={<Textbox />} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
