import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import Textbox from './textbox.js';
// import Data from './data.json'; // does this go here!?!?!?!?

function App() {
 
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/:id" children={<Textbox />} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
