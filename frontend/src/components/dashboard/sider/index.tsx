import React, { useRef, useCallback } from 'react';
import { Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { CaretDownOutlined } from '@ant-design/icons';
import { logout } from '@/actions';
import { useHistory } from "react-router-dom";

import Setting from '@/assets/imgs/shezhi.svg';
import Group from '@/assets/imgs/zuzhi.svg';
import Folder from '@/assets/imgs/document.svg';
import Interview from '@/assets/imgs/interview.svg';
import Logo from 'assets/logo/logo.png'

import { useUserInfo } from 'hooks/useLogin'

import './index.scss';

export const Sider = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useUserInfo()
  const menuData = useRef([{
    name: '面试',
    icon: Interview,
    path: '/dashboard/interviewlist'
  }, {
    name: '题库',
    icon: Folder,
    path: '/dashboard/questions',
    develop: true
  }, {
    name: '团队',
    icon: Group,
    path: '/dashboard/team'

  }, {
    name: '设置',
    icon: Setting,
    path: '/dashboard/settings'
  }])


  const jumpRoute = useCallback((e) => {
    history.replace(e.key);
  }, [])

  const handleLogout = () => {
    dispatch(logout());
  };

  const Usermenu = (
    <Menu onClick={handleLogout}>
      <Menu.Item key="logout">
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div>
        <div className="logo"><img src={Logo} alt="" /></div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={jumpRoute}>
          {
            menuData.current.map(i => (
              <Menu.Item key={i.path} className="menu-item" disabled={i.develop}>
                <img src={i.icon} alt="" className="icon" />
                <b className="font-zh">{i.name}</b>
              </Menu.Item>
            ))
          }
        </Menu>
      </div>
      <Dropdown overlay={Usermenu} className="user-dropdown">
        <div>{user?.name} <CaretDownOutlined /></div>
      </Dropdown>
    </>)
}