import React, { FC, useCallback } from "react";
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./header.scss";

const Header: FC = () => {
  const history = useHistory();
  const user = useSelector(state => (state as any).accout);
  const jumpRoute = useCallback((e) => {
    console.log(e);
    history.push(e.key);
  }, [])

  const handleMenuClick = () => {
    console.log('click');
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="my">
        个人中心
      </Menu.Item>
      <Menu.Item key="setting">
          设置
      </Menu.Item>
      <Menu.Item key="logout">
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dash-header">
      <div></div>
      <div>
        <Dropdown overlay={menu}>
          <Button>
            {user.name} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header;