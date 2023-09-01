import React, { ReactDOM } from 'react';
import { Divider } from 'antd';
import './settingItem.scss';

export const SettingItem = ({ children }: { children: any }) => {
  return (
    <div>
      <div className="setting-item">
        {children}
      </div>
      <Divider />
    </div>
  )
}