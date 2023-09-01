import React from "react";
import './dashboard.scss';
import { useDetectLogin } from 'hooks/useLogin';
import { Layout } from 'antd';
import InterviewList from 'views/dashboard/list';
import Team from 'views/dashboard/team';
import { CreateTeam } from 'components/team/createTeam';
import Questions from 'views/dashboard/questions';
import Settings from 'views/dashboard/setting';
import Opinion from 'views/dashboard/opinion';
import { Sider as SiderComponent } from 'components/dashboard/sider'

import {
  Switch,
  Route
} from "react-router-dom";

const { Sider, Content } = Layout;

const Dashboard = () => {
  useDetectLogin();

  return (
    <div className="dashboard">
      <Layout className="layout">
        <Sider width={240}
          className="sider">
          <SiderComponent />
        </Sider>
        <Content>
          <Switch>
            <Route path="/dashboard" exact children={<InterviewList />} />
            <Route path="/dashboard/interviewlist" children={<InterviewList />} />
            <Route path="/dashboard/team" children={<Team />} />
            <Route path="/dashboard/createteam" children={<CreateTeam />} />
            <Route path="/dashboard/questions" children={<Questions />} />
            <Route path="/dashboard/settings" children={<Settings />} />
            <Route path="/dashboard/opinion" children={<Opinion />} />
          </Switch>
        </Content>
      </Layout>
    </div>
  )
}

export default Dashboard;