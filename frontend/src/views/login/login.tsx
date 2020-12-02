import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '@/actions';
import { useHistory } from "react-router-dom";
import './login.scss';

const { TabPane } = Tabs;

const Login: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rememberChecked, setRemeber] = useState(true);
  const [help, setHelp] = useState('');

  const onFinish = useCallback((values:any) => {
    const run = async () => {
      const res:any = await dispatch(login(values));
      if(res.code === 0) {
        history.push('/dashboard')
      }
      else {
        setHelp(res.message)
      }
    }
    run();
  }, []);

  useEffect(() => {
    const setUp = async () => {
      try {

      }
      catch (err) {
        throw err;
      }
    }
    setUp();
  }, [])

  const VerifyBtn: FC = () => {
    // false为未发送，true未已发送
    const [sendCode, setSendCode] = useState(false);
    return (
      <span>发送验证码</span>
    )
  }

  const HelpCom:FC = () => <div className="help-word">{help}</div>

  return (
    <div className="login">
      <Tabs defaultActiveKey="passwrd" className="tabs" centered>
        <TabPane
          tab={
            <span>
              手机验证码
        </span>
          }
          key="mobile"
        >
          <Form
            className="form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="mobile"
            >
              <Input placeholder="手机号码" className="input" />
            </Form.Item>

            <Form.Item
              name="code"
            >
              <Input placeholder="验证码" className="input" addonAfter={<VerifyBtn />} />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" className="login-btn">
                登录
            </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span>
              密码登录
            </span>
          }
          key="passwrd"
        >
          <Form
            className="form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="mobile"
            >
              <Input placeholder="手机号码" className="input" />
            </Form.Item>

            <Form.Item
              name="password"
              help={<HelpCom />}
            >
              <Input.Password placeholder="密码" className="input" />
            </Form.Item>

            <Form.Item>
              <Checkbox checked={rememberChecked} onChange={() => setRemeber(!rememberChecked)}>记住我</Checkbox>
              <span>忘记密码？</span>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" className="login-btn">
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Login;