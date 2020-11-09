import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams
} from "react-router-dom";
import Home from '@/views/home/home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/home" children={<Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
