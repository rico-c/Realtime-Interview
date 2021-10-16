import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import { login } from 'actions';
import { useDispatch } from 'react-redux';
import { Loading } from 'views/loading/loading';
import { checkMobileOS } from './utils/checkEnviroment';

const Home = React.lazy(() => import('views/home/home'));
const Login = React.lazy(() => import('views/login/login'));
const Interview = React.lazy(() => import('views/interview/interview'));
const Dashboard = React.lazy(() => import('views/dashboard/dashboard'));
const Result = React.lazy(() => import('views/result/result'));
const Mobile = React.lazy(() => import('views/mobile'));

const RoutesJSX = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.pathname !== '/' && checkMobileOS() && location.pathname !== '/mobilenotice') {
      history.push('/mobilenotice')
    }
  }, [location.pathname])

  useEffect(() => {
    dispatch(login({
      mobile: '',
      password: '',
      rememberme: true
    }));
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact children={<Home />} />
        <Route path="/login" children={<Login />} />
        <Route path="/interview/:roomId" children={<Interview />} />
        <Route path="/dashboard" children={<Dashboard />} />
        <Route path="/result/:roomId" children={<Result />} />
        <Route path="/mobilenotice" children={<Mobile />} />
      </Switch>
    </Suspense>
  );
}

const App = () => {
  return (
    <Router>
      <RoutesJSX />
    </Router>)
}

export default App;
