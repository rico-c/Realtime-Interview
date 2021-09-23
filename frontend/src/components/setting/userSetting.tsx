import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { SettingItem } from './settingItem';
import { Input } from 'antd';


const UserSetting: FC = () => {
  const userAccount = useSelector(state => (state as any).accout);

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="setting-section">
      <p className="c-font-big c-font-bold">用户</p>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">手机</span>
          <span>{userAccount.mobile}</span>
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">用户名</span>
          <Input className="input" defaultValue={userAccount.name} placeholder="将在面试时展现给候选人" />
        </>
      </SettingItem>
    </div >
  );
};

export default UserSetting;
