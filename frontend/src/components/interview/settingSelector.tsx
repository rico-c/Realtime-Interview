import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import './settingSelector.scss';
import { Popover, Button, Form, Radio, Select, Switch } from 'antd';
import {
  SettingFilled,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';

interface SettingSelectorProps {
    setFontsize: any,
    setSuggestion: any,
    setTabsize: any;
    suggestion: boolean
}

const { Option } = Select;

const SettingSelector: FC<SettingSelectorProps> = props => {
  const { setFontsize, setSuggestion, setTabsize, suggestion } = props;
  const [visible, setVisible] = useState(false);
  const suggestionChange = useCallback(value => {
    setSuggestion(value);
  }, []);
  const content = (
    <div className="editor-setting-pop">
      <div className="item">
        <span className="labelname">代码提示：</span>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={suggestionChange} checked={suggestion} />
      </div>
      <div className="item">
        <span className="labelname">代码字号：</span>
        <Button icon={<ZoomInOutlined />} onClick={() => setFontsize(value => value + 1)}></Button>
        <Button icon={<ZoomOutOutlined />} onClick={() => setFontsize(value => value - 1)}></Button>
      </div>
      <div className="item">
        <span className="labelname">Tab空格：</span>
        <Select defaultValue="4" onChange={value => setTabsize(Number(value))} >
          <Option value="2">2格</Option>
          <Option value="4">4格</Option>
        </Select>
      </div>
    </div>
  );
  return (
    <Popover
      className="setting-selector"
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={() => setVisible(!visible)}
    >
      <Button ghost icon={<SettingFilled />} className="btn">设置</Button>
    </Popover>
  );
};

export default SettingSelector;
