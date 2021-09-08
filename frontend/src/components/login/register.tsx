import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { WidthButton } from '../common/widthBtn';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from 'actions/accout'


export const Register = ({ setLogin }: { setLogin: (boolean) => void }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [readProtocol, setReadProtocol] = useState(false);
  const [help, setHelp] = useState<string>('');

  const onRegister = async (values) => {
    const res:any = await dispatch(register(values));
    if (res.code === 0) {
      history.push('/dashboard');
    } else {
      setHelp(res.message);
    }
  }

  const onReadProtocol = useCallback((e) => {
    const res = e.target.checked;
    setReadProtocol(res);
  }, []);

  const HelpCom = () => <div className="help-word">{help}</div>;

  return (
    <div className="register">
      <h1>注册新用户</h1>
      <Form
        className="form"
        labelCol={{ span: 4 }}
        onFinish={onRegister}
        size="large"
      >
        <Form.Item name="name" label="姓名">
          <Input placeholder="面试时会展现您的姓名" className="input" />
        </Form.Item>

        <Form.Item name="mobile" label="手机">
          <Input placeholder="手机号码" className="input" />
        </Form.Item>

        <Form.Item name="password" label="密码">
          <Input placeholder="密码" className="input" />
        </Form.Item>

        <Form.Item name="repeatpassword" help={<HelpCom />} label="确认密码">
          <Input placeholder="请再输入一次密码" className="input" />
        </Form.Item>

        <Form.Item>
          <WidthButton type="primary" htmlType="submit" size="large">
            注册
          </WidthButton>
        </Form.Item>
        <div>
          <Checkbox
            checked={readProtocol}
            onChange={onReadProtocol}
          /> 阅读并接受《用户协议》及《隐私权保护声明》
        </div>
      </Form>
      <Button type="link" className="float-right" onClick={() => setLogin(true)}>
        已有帐号？去登录
      </Button>
    </div>
  )
}
