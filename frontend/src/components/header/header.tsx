import React, { FC, useCallback } from "react";
import { Menu } from 'antd';
import Icon from "@/assets/imgs/icon.svg";
import "./header.scss";

const Header: FC = () => {
  const handleClick = useCallback((e) => {
    console.log(e);
  }, [])

  return (
    <div className="header">
      <div className="icon">
        <span className="logo-icon">
          <img src={Icon} />
        </span>
        <span className="logo-txt">Realtime Interview</span>
      </div>
      <div className="menu">
        <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
          <Menu.Item key="product">
            产品
          </Menu.Item>
          <Menu.Item key="price">
            价格
          </Menu.Item>
          <Menu.Item key="login">
            登录
          </Menu.Item>
          <Menu.Item key="dashboard">
            控制台
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Header;