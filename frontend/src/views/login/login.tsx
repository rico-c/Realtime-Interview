import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import { Tabs } from 'antd';
import './login.scss';
import PasswordLogin from '@/components/login/passwordLogin';
import MobileLogin from '@/components/login/mobileLogin';
const { TabPane } = Tabs;

const Login: FC = () => {
  return (
    <div className="login">
      <Tabs defaultActiveKey="passwrd" className="tabs" centered>
        <TabPane tab={<span>手机验证码</span>} key="mobile">
          <MobileLogin />
        </TabPane>
        <TabPane tab={<span>密码登录</span>} key="passwrd">
          <PasswordLogin />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Login;
