import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '@/views/home/home';
import Login from '@/views/login/login';
import Interview from '@/views/interview/interview';
import Dashboard from '@/views/dashboard/dashboard';
import Result from '@/views/result/result';
import { login } from '@/actions';
import { useDispatch } from 'react-redux';

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({
      mobile: '',
      password: ''
    }));
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" exact children={<Home />} />
        <Route path="/home" children={<Home />} />
        <Route path="/login" children={<Login />} />
        <Route path="/interview/:roomId" children={<Interview />} />
        <Route path="/dashboard" children={<Dashboard />} />
        <Route path="/result/:roomId" children={<Result />} />
      </Switch>
    </Router>
  );
}

export default Routes;
