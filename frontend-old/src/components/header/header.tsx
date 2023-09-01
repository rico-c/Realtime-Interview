import React, { FC, useCallback } from "react";
import { Menu } from 'antd';
import { useHistory } from "react-router-dom";
import Icon from "@/assets/logo/logo.png";
import { useSelector } from 'react-redux';
import "./header.scss";

const { SubMenu } = Menu;

const Header: FC = () => {
  const history = useHistory();
  const userId = useSelector(state => (state as any).accout.userId);
  const jumpRoute = useCallback((e) => {
    history.push(e.key);
  }, [])

  return (
    <div className="header">
      <div className="icon" onClick={() => history.push('/')}>
        <span className="logo-icon">
          <img className="logo-txt" src={Icon} />
        </span>
      </div>
      <div className="home-menu">
        <Menu onClick={jumpRoute} selectedKeys={[]} mode="horizontal">
          {/* <Menu.Item title="" key="/product">
            产品
          </Menu.Item>
          <Menu.Item key="/price">
            价格
          </Menu.Item> */}
          <Menu.Item key="/help/">
            帮助
          </Menu.Item>
          {
            userId ? (
              <Menu.Item key="/dashboard">
                控制台
              </Menu.Item>
            ) : (
              <Menu.Item key="/login">
                登录
              </Menu.Item>
            )
          }
        </Menu>
      </div>
    </div>
  )
}

export default Header;