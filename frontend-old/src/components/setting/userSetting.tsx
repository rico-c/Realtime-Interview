import React, { FC, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SettingItem } from './settingItem';
import { Input, Button, message } from 'antd';
import { rename } from 'actions/accout';
import { useUserInfo } from '@/hooks/useLogin';


const UserSetting: FC = () => {
  const userAccount = useSelector(state => (state as any).accout);
  const [name, setName] = useState<string>(userAccount.name);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const originalName = useRef(name);
  const { userId } = useUserInfo();

  const handleNameChange = e => {
    const v = e.target.value;
    setName(v);
    if (originalName.current === v) {
      setShowBtn(false);
    }
    else {
      setShowBtn(true);
    }
  }

  const confirmChangeName = async () => {
    await rename({ name, userId });
    message.success('修改成功');
    window.location.reload();
  }

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
          <span>
            <Input
              className="input"
              value={name}
              onChange={e => handleNameChange(e)}
              placeholder="将在面试时展现给候选人"
            />
            {showBtn && <Button type="link" onClick={confirmChangeName}>确认更改</Button>}
          </span>
        </>
      </SettingItem>
    </div >
  );
};

export default UserSetting;
