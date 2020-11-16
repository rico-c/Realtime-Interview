import React, { FC, useCallback } from "react";
import { Menu } from 'antd';
import { useHistory } from "react-router-dom";
import Icon from "@/assets/imgs/icon.svg";
import "./header.scss";

const { SubMenu } = Menu;

const Header: FC = () => {
  const history = useHistory();

  const jumpRoute = useCallback((e) => {
    console.log(e);
    history.push(e.key);
  }, [])

  return (
    <div className="header">
      <div className="icon" onClick={() => history.push('/')}>
        <span className="logo-icon">
          <img src={Icon} />
        </span>
        <span className="logo-txt">Realtime Interview</span>
      </div>
      <div className="menu">
        <Menu onClick={jumpRoute} selectedKeys={[]} mode="horizontal">
          <SubMenu title="产品">
            <Menu.Item key="setting:1">实时代码面试</Menu.Item>
            <Menu.Item key="setting:2">限时编码题目</Menu.Item>
            <Menu.Item key="setting:3">限时预留作业</Menu.Item>
          </SubMenu>
          <Menu.Item key="/price">
            价格
          </Menu.Item>
          <Menu.Item key="/login">
            登录
          </Menu.Item>
          <Menu.Item key="/dashboard">
            控制台
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Header;