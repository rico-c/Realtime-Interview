import React, { FC, useEffect, useMemo, useCallback } from "react";
import './dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, Menu, Layout } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { logout } from '@/actions';
import { useHistory } from "react-router-dom";

import List from '@/views/dashboard/list';
import Team from '@/views/dashboard/team';
import Questions from '@/views/dashboard/questions';
import Settings from '@/views/dashboard/setting';

import {
  Switch,
  Route
} from "react-router-dom";

import Setting from '@/assets/imgs/setup.png';
import Group from '@/assets/imgs/group.png';
import Monitor from '@/assets/imgs/monitor.png';
import Folder from '@/assets/imgs/folder.png';

const { Sider, Content } = Layout;

const Dashboard: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => (state as any).accout);
  const menuData = useMemo(() => {
    return [{
      name: '面试',
      icon: Monitor,
      path: '/dashboard/list'
    }, {
      name: '我的题库',
      icon: Folder,
      path: '/dashboard/questions'
    }, {
      name: '团队',
      icon: Group,
      path: '/dashboard/team'

    }, {
      name: '设置',
      icon: Setting,
      path: '/dashboard/settings'
    }]
  }, [])

  const handleLogout = useCallback(() => {
    const run = async () => {
      const res: any = await dispatch(logout());
      if (res.code === 0) {
        history.push('/')
      }
    }
    run();
  }, []);

  const Usermenu = (
    <Menu onClick={handleLogout}>
      <Menu.Item key="logout">
        退出登录
      </Menu.Item>
    </Menu>
  );

  const jumpRoute = useCallback((e) => {
    history.replace(e.key);
  }, [])

  return (
    <div className="dashboard">
      <Layout className="layout">
        <Sider width={120}
          className="sider"
          theme="light">
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={jumpRoute}>
            {
              menuData.map(i => (
                <Menu.Item key={i.path} className="menu-item">
                  <div className="icon">
                    <img src={i.icon} />
                  </div>
                  <div>{i.name}</div>
                </Menu.Item>
              ))
            }
          </Menu>
          <Dropdown overlay={Usermenu} className="user-dropdown">
            <Button>
              {user.name} <DownOutlined />
            </Button>
          </Dropdown>
        </Sider>
        <Content>
          <Switch>
            <Route path="/dashboard" exact children={<List />} />
            <Route path="/dashboard/list" children={<List />} />
            <Route path="/dashboard/team" children={<Team />} />
            <Route path="/dashboard/questions" children={<Questions />} />
            <Route path="/dashboard/settings" children={<Settings />} />
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}

export default Dashboard;