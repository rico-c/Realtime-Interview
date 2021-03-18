import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { login, register } from '@/actions';
import { useHistory } from 'react-router-dom';
import './passwordLogin.scss';

const PasswordLogin: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rememberChecked, setRemeber] = useState(true);
  const [readProtocol, setReadProtocol] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [help, setHelp] = useState('');

  const onFinish = useCallback((values: any) => {
    const run = async () => {
      const res: any = await dispatch(login(values));
      if (res.code === 0) {
        history.push('/dashboard');
      } else {
        setHelp(res.message);
      }
    };
    run();
  }, []);

  const onRegister = useCallback((values: any) => {
    const run = async () => {
      console.log();
      const res: any = await dispatch(register(values));
      if (res.code === 0) {
        history.push('/dashboard');
      } else {
        // setHelp(res.message);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const setUp = async () => {
      try {
      } catch (err) {
        throw err;
      }
    };
    setUp();
  }, []);

  const startRegiste = useCallback(() => {
    setIsRegisterModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsRegisterModalVisible(false);
  }, []);

  const onReadProtocol = useCallback((e) => {
    const res = e.target.checked;
    setReadProtocol(res);
  }, []);

  const HelpCom: FC = () => <div className="help-word">{help}</div>;

  return (
    <div className="password-login">
      <Form
        className="form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="mobile">
          <Input placeholder="手机号码" className="input" />
        </Form.Item>

        <Form.Item name="password" help={<HelpCom />}>
          <Input.Password placeholder="密码" className="input" />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={rememberChecked}
            onChange={() => setRemeber(!rememberChecked)}
          >
            记住我
          </Checkbox>
          {/* <Button type="text">忘记密码？</Button> */}
          <Button type="link" className="float-right" onClick={startRegiste}>
            注册账号
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-btn" size="large" shape="round">
            登录
          </Button>
        </Form.Item>
      </Form>
      <Modal title="欢迎注册" footer={null} visible={isRegisterModalVisible} onCancel={handleCloseModal}>
        <Form
          className="form"
          labelCol={{ span: 5 }}
          onFinish={onRegister}
        >
          <Form.Item name="name" label="姓名">
            <Input placeholder="面试时会展现您的姓名" className="input" />
          </Form.Item>

          <Form.Item name="mobile" label="手机号">
            <Input placeholder="手机号码" className="input" />
          </Form.Item>

          <Form.Item name="password" help={<HelpCom />} label="密码">
            <Input.Password placeholder="密码" className="input" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" shape="round" style={{
              display: 'block',
              margin: '0 auto',
              width: '80%'
            }}>
              注册
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Checkbox
              onChange={onReadProtocol}
            />阅读并接受《用户协议》及《隐私权保护声明》
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PasswordLogin;
