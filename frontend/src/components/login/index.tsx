import React, { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import "./index.scss";

const LoginPage = () => {
  const [isLogin, setLogin] = useState<boolean>(true);


  return (
    <div className="login-page">
      {isLogin ? (
        <Login setLogin={setLogin} />
      ) : (
        <Register setLogin={setLogin} />
      )}
    </div>
  );
};

export default LoginPage;
