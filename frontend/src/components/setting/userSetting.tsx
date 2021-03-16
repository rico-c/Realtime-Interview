import React, { FC, useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, Tooltip, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const UserSetting: FC = () => {
  const userAccount = useSelector(state => (state as any).accout);

  const [changename, setChangename] = useState(false);

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="用户名">
          <span>{userAccount.name}</span>
          <a href="#API" style={{ margin: '0 8px' }}>
            修改用户名
           </a>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
        >
          <span>{userAccount.mobile}</span>
        </Form.Item>
        <Form.Item
          label="登录密码"
          name="mobile"
        >
          <span> · · · · · · · · · </span>
          <a href="#API" style={{ margin: '0 8px' }}>
            修改密码
           </a>
        </Form.Item>
        <Form.Item
          label="第三方账号绑定"
          name="mobile"
        ></Form.Item>
      </Form>
    </div >
  );
};

export default UserSetting;
