import React, { FC, useCallback } from "react";
import UserSetting from '@/components/setting/userSetting';
import GeneralSetting from '@/components/setting/generalSetting';
import { CardWrapper } from '@/components/common/cardWrapper';
import './setting.scss';

const Setting: FC = () => {
  return (
    <div className="setting-page">
      <div className="header">
        <div className="header-left">
          <span className="header-title">设置</span>
        </div>
      </div>
      <div className="half-wrapper">
        <CardWrapper>
          <UserSetting />
          <GeneralSetting />
        </CardWrapper>
      </div>
    </div>
  )
}

export default Setting;