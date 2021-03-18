import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/actions';
import { useHistory } from 'react-router-dom';
import './mobileLogin.scss';
const { TabPane } = Tabs;

const MobileLogin: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rememberChecked, setRemeber] = useState(true);
  const [help, setHelp] = useState('');

  useEffect(() => {
    const setUp = async () => {
      try {
      } catch (err) {
        throw err;
      }
    };
    setUp();
  }, []);

  const VerifyBtn: FC = () => {
    // false为未发送，true未已发送
    const [sendCode, setSendCode] = useState(false);
    return <span>发送验证码</span>;
  };

  return (
    <div className="mobile-login">
        <p>功能开发中...</p>
          <Form className="form" initialValues={{ remember: true }}>
            <Form.Item name="mobile">
              <Input placeholder="手机号码" className="input" />
            </Form.Item>

            <Form.Item name="code">
              <Input
                placeholder="验证码"
                className="input"
                addonAfter={<VerifyBtn />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-btn" disabled>
                登录
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
};

export default MobileLogin;
