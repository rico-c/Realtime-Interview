import React, { FC, useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, Tooltip, Button } from 'antd';

const UserSetting: FC = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div>
      <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="用户名">
          <Form.Item
            name="username"
            noStyle
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <Input style={{ width: 320 }} placeholder="请输入新用户名" />
          </Form.Item>
          <a href="#API" style={{ margin: '0 8px' }}>
            修改用户名
           </a>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
        >
          <Input placeholder="Input birth month" style={{ width: 320 }} />
        </Form.Item>
        <Form.Item
          label="登录密码"
          name="mobile"
        >
          <Input placeholder="Input birth month" style={{ width: 320 }} />
        </Form.Item>
        <Form.Item
          label="第三方账号绑定"
          name="mobile"
        >
          <Input placeholder="Input birth month" style={{ width: 320 }} />
        </Form.Item>
      </Form>
    </div >
  );
};

export default UserSetting;
