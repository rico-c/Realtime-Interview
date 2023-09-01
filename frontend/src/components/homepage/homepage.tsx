import React, { FC, useCallback } from "react";
import { Button, message } from 'antd';
import { useHistory } from "react-router-dom";
import { createInterview, createRoomid } from "actions";
import Intro from 'assets/imgs/homepageIntro.png';
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
      <div className="title">一站式在线技术面试平台</div>
      <div className="main">
        <div className="left">
          <div className="sub-title">多人同步的在线VSCode编辑器</div>
          <div className="sub-title">17种主流代码语言实时编译</div>
          <div className="sub-title">高清视频语音通话</div>
          <Button className="try" type="primary" onClick={jumpDemo}>试用</Button>
        </div>
        <div className="right">
          <img src={Intro} alt="realtime-interview" />
        </div>
      </div>
      <div className="desc">
        <div className="desc-item">
          <i className="iconfont">&#xe61a;</i>
          <div>
            <div className="desc-title">VSCode般的顺滑编码体验</div>
            <div className="desc-txt">多人瞬时同步代码同步，snippets随叫随到</div>
          </div>
        </div>
        <div className="desc-item">
          <i className="iconfont">&#xe61b;</i>
          <div>
            <div className="desc-title">随意切换主流代码语言</div>
            <div className="desc-txt">支持Java/Python/PHP/JS/TS/C++/Go等主流语言</div>
          </div>
        </div>
        <div className="desc-item">
          <i className="iconfont">&#xe61c;</i>
          <div>
            <div className="desc-title">免费高清视频通话</div>
            <div className="desc-txt">想面多久，就面多久</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;