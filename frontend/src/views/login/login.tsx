import React from 'react';
import './login.scss';
import LoginPage from 'components/login';
import BG from 'assets/states/work.png';
import LOGO from 'assets/logo/logo-white.svg';

const Login = () => {
  return (
    <div className="login">
      <div className="bg-img">
        <img src={LOGO} alt="" className="logo" />
        <img src={BG} alt="" className="bg" />
      </div>
      <div className="login-area">
        <LoginPage />
      </div>
    </div>
  );
};

export default Login;
