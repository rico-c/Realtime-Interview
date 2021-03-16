import React, { FC, useCallback } from "react";
import { Tabs } from 'antd';
import UserSetting from '@/components/setting/userSetting';
import GeneralSetting from '@/components/setting/generalSetting';
import './setting.scss';

const { TabPane } = Tabs;

const Setting: FC = () => {
  return (
    <div className="setting-page">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="用户设置" key="1">
          <UserSetting />
        </TabPane>
        <TabPane tab="通用设置" key="2">
          <GeneralSetting />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Setting;