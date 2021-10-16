import React from 'react';
import {
  LoadingOutlined,
} from '@ant-design/icons';
import './loading.scss';
import LOGO from 'assets/logo/logo.png';

export const Loading = () => {
  return (
    <div className="wrapper">
      <div>
        <img src={LOGO} style={{ width: '200px' }} />
      </div>
      <div style={{ marginBottom: '20px' }}><strong>努力加载中...</strong></div>
      <LoadingOutlined className="icon" />
    </div>
  )
}