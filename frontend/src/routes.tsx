import React, { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '@/views/home/home';
import Login from '@/views/login/login';
import Interview from '@/views/interview/interview';
import Dashboard from '@/views/dashboard/dashboard';
import Price from '@/views/price/price';
import Result from '@/views/result/result';
import { login } from '@/actions';
import { useDispatch } from 'react-redux';

const Routes: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({}));
  }, [])
  return (
    <div className="App" >
      <Router>
        <Switch>
          <Route path="/" exact children={<Home />} />
          <Route path="/home" children={<Home />} />
          <Route path="/login" children={<Login />} />
          <Route path="/price" children={<Price />} />
          <Route path="/interview/:roomId" children={<Interview />} />
          <Route path="/dashboard" children={<Dashboard />} />
          <Route path="/result/:roomId" children={<Result />} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
