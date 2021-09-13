import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { login } from 'actions';
import { useDispatch } from 'react-redux';
import { Loading } from 'views/loading/loading';

const Home = React.lazy(() => import('views/home/home'));
const Login = React.lazy(() => import('views/login/login'));
const Interview = React.lazy(() => import('views/interview/interview'));
const Dashboard = React.lazy(() => import('views/dashboard/dashboard'));
const Result = React.lazy(() => import('views/result/result'));

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({
      mobile: '',
      password: '',
      rememberme: true
    }));
  }, [])

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact children={<Home />} />
          <Route path="/home" children={<Home />} />
          <Route path="/login" children={<Login />} />
          <Route path="/interview/:roomId" children={<Interview />} />
          <Route path="/dashboard" children={<Dashboard />} />
          <Route path="/result/:roomId" children={<Result />} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
