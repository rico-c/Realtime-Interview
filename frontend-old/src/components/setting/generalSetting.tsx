import React, { FC } from 'react';
import { SettingItem } from './settingItem';
import LanguageSelector from 'components/interview/languageSelector';
import { Switch, Select } from 'antd';

const { Option } = Select;

const GeneralSetting: FC = () => {
  const handleTabChange = () => {

  }

  return (
    <div className="setting-section">
      <p className="c-font-big c-font-bold">面试</p>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">默认语言</span>
          <LanguageSelector />
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">默认缩进</span>
          <Select defaultValue="4" style={{ width: 120 }} onChange={handleTabChange}>
            <Option value="2">2</Option>
            <Option value="4">4</Option>
          </Select>
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">默认开启snippets</span>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">候选人切屏时提示（仅面试官可见）</span>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={false}  disabled/>
        </>
      </SettingItem>
    </div>
  );
};

export default GeneralSetting;
