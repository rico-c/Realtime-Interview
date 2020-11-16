import React, { FC, useCallback } from "react";
import { Button } from 'antd';
import { useHistory } from "react-router-dom";
import './homepage.scss';

const HomePage: FC = () => {
  const history = useHistory();

  const jumpDemo = useCallback((e) => {
    history.push(e.key);
  }, [])

  return (
    <div className="home-page">
      <div className="title">如何更好地远程技术面试？</div>
      <div className="sub-title">实时同步的在线代码编辑器和视频面试</div>
      <Button className="try" type="primary" onClick={jumpDemo}>试用</Button>
    </div>
  )
}

export default HomePage;