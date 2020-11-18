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
import Login from '@/views/login/login';
import Interview from '@/views/interview/interview';
import Dashboard from '@/views/dashboard/dashboard';
import Price from '@/views/price/price';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact children={<Home />} />
          <Route path="/home" children={<Home />} />
          <Route path="/login" children={<Login />} />
          <Route path="/price" children={<Price />} />
          <Route path="/interview/:userid" children={<Interview />} />
          <Route path="/dashboard" children={<Dashboard />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
