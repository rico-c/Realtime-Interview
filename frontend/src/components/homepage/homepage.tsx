import React, { FC, useCallback } from "react";
import { Button, message } from 'antd';
import { useHistory } from "react-router-dom";
import { createInterview, createRoomid } from "@/actions";
import './homepage.scss';

const HomePage: FC = () => {
  const history = useHistory();

  const jumpDemo = useCallback(async () => {
    const roomid = await createRoomid('trydemo');
    if (!roomid) {
      message.error('创建面试ID失败');
    }
    const res = await createInterview({
      id: roomid,
      creator: 'trydemo',
      teamId: 'trydemo',
      type: 2
    });
    if (res.code === 0) {
      history.push({
        pathname: `/interview/${roomid}`, state: {
          demo: true
        }
      })
    }
    else {
      message.error('创建失败，请稍后再试');
    }
  }, []);

  return (
    <div className="home-page">
      <div className="title">如何更好地远程技术面试？</div>
      <div className="sub-title">实时同步的在线代码编辑器和视频面试</div>
      <Button className="try" type="primary" onClick={jumpDemo}>试用</Button>
    </div>
  )
}

export default HomePage;