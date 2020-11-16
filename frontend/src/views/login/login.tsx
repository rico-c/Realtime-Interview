import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import './login.scss';

const { TabPane } = Tabs;

const Login: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const doLogin = useCallback(
    () => {
      console.log(111);
    },
    []
  )
  const [rememberChecked, setRemeber] = useState(true);

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

  return (
    <div className="login">
      <Tabs defaultActiveKey="email" className="tabs" centered>
        <TabPane
          tab={
            <span>
              邮箱登录
        </span>
          }
          key="email"
        >
          <Form
            className="form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
            >
              <Input placeholder="邮箱" className="input" />
            </Form.Item>

            <Form.Item
              name="password"
            >
              <Input.Password placeholder="密码" className="input" onPressEnter={doLogin} />
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="mobile"
            >
              <Input placeholder="手机" className="input" />
            </Form.Item>

            <Form.Item
              name="code"
            >
              <Input placeholder="验证码" className="input" onPressEnter={doLogin} addonAfter={VerifyBtn}/>
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