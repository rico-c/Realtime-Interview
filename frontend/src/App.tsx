import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from '@/reducers/store';
import Home from '@/views/home/home';
import Login from '@/views/login/login';
import Interview from '@/views/interview/interview';
import Dashboard from '@/views/dashboard/dashboard';
import Price from '@/views/price/price';
import './App.scss';

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="App" >
        <Router>
          <Switch>
            <Route path="/" exact children={<Home />} />
            <Route path="/home" children={<Home />} />
            <Route path="/login" children={<Login />} />
            <Route path="/price" children={<Price />} />
            <Route path="/interview" children={<Interview />} />
            <Route path="/dashboard" children={<Dashboard />} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
