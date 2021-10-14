import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Form, Input, Checkbox, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons'
import { WidthButton } from '../common/widthBtn';
import { login } from 'actions/accout'
import { checkLogin } from 'utils/checkValidate'
import { useLoginJump } from '@/hooks/useLogin';
import { getUrlParam } from 'utils/GetUrlParams';
import { useHistory } from 'react-router';

export const Login = ({ setLogin }: { setLogin: (boolean) => void }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [help, setHelp] = useState<string>('');

  const onFinish = async (values) => {
    const checkRes = checkLogin(values);
    if (!checkRes.state) {
      return setHelp(checkRes.msg);
    }
    dispatch(login(values));
  };

  const roomId = getUrlParam('r');
  useLoginJump(roomId);

  const HelpCom = () => <div className="help-word">{help}</div>;

  return (
    <div className="password-login">
      <h1>登录</h1>
      <Form
        className="form"
        initialValues={{ rememberme: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item name="mobile">
          <Input placeholder="手机号码" className="input" />
        </Form.Item>

        <Form.Item name="password" help={<HelpCom />}>
          <Input.Password placeholder="密码" className="input" />
        </Form.Item>

        <Form.Item name="rememberme" valuePropName="checked">
          <Checkbox> 记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <WidthButton type="primary" htmlType="submit" className="login-btn" size="large">
            登录
          </WidthButton>
        </Form.Item>
      </Form>
      <div>
        <Button type="link" icon={<LeftOutlined />} className="float-left" onClick={() => history.push('/')}>
          返回首页
        </Button>
        <Button type="link" className="float-right" onClick={() => setLogin(false)}>
          注册账号
        </Button>
      </div>
    </div>
  )
}