import React from 'react';
import {
  LoadingOutlined,
} from '@ant-design/icons';
import './loading.scss';

export const Loading = () => {
  return (
    <div className="wrapper">
      <LoadingOutlined className="icon" />
      <div><strong>努力加载中...</strong></div>
    </div>
  )
}