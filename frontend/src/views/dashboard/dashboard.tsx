import React, { FC,useEffect } from "react";
import { Layout, Menu } from 'antd';
import './dashboard.scss';
import Header from '@/components/dashboard/header';
import { login } from '@/actions';
import { useDispatch } from 'react-redux';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const Dashboard: FC = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(login({}));
  // }, [])

  return (
    <div className="dashboard">
      <Layout className="layout">
        <Sider width={120}
          className="sider"
          theme="light">
          <div className="logo">Dashboard</div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <div>nav 1</div>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Header />
          content
        </Content>
      </Layout>
    </div>
  )
}

export default Dashboard;