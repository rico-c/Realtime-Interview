import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { WidthButton } from '../common/widthBtn';
import { useDispatch } from "react-redux";
import { register } from 'actions/accout'
import { useLoginJump } from '@/hooks/useLogin';
import { checkRegister } from 'utils/checkValidate'
import { getUrlParam } from 'utils/GetUrlParams';

export const Register = ({ setLogin }: { setLogin: (boolean) => void }) => {
  const dispatch = useDispatch();
  const [help, setHelp] = useState<string>('');

  const onRegister = (values) => {
    const checkRes = checkRegister(values);
    if (!checkRes.state) {
      return setHelp(checkRes.msg);
    }
    dispatch(register(values));
  }
  const roomId = getUrlParam('r');
  useLoginJump(roomId);

  const HelpCom = () => <div className="help-word">{help}</div>;

  return (
    <div className="register">
      <h1>注册新用户</h1>
      <Form
        className="form"
        labelCol={{ span: 4 }}
        onFinish={onRegister}
        initialValues={{ readProtocol: false }}
        size="large"
      >
        <Form.Item name="name" label="姓名">
          <Input placeholder="面试时会展现您的姓名" className="input" />
        </Form.Item>

        <Form.Item name="mobile" label="手机">
          <Input placeholder="手机号码" className="input" />
        </Form.Item>

        <Form.Item name="password" label="密码">
          <Input placeholder="密码" className="input" type="password" />
        </Form.Item>

        <Form.Item name="repeatpassword" help={<HelpCom />} label="确认密码">
          <Input placeholder="请再输入一次密码" className="input" type="password" />
        </Form.Item>

        <Form.Item>
          <WidthButton type="primary" htmlType="submit" size="large">
            注册
          </WidthButton>
        </Form.Item>
        <Form.Item valuePropName="checked" name="readProtocol">
          <Checkbox> 阅读并接受《用户协议》及《隐私权保护声明》</Checkbox>
        </Form.Item>
      </Form>
      <Button type="link" className="float-right" onClick={() => setLogin(true)}>
        已有帐号？去登录
      </Button>
    </div>
  )
}
