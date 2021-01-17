import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import "./settingSelector.scss";
import { Popover, Button, Form, Radio, Select } from "antd";
import { SettingFilled, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';

const { Option } = Select;

const SettingSelector: FC = () => {
  const [visible, setVisible] = useState(false);
  const onFormLayoutChange = useCallback(
    () => {
      
    },
    [],
  )
  const content = (
    <Form
      layout="horizontal"
      initialValues={{ codeHelper: false}}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="代码提示" name="codeHelper">
        <Radio.Group>
          <Radio.Button value={false}>关</Radio.Button>
          <Radio.Button value={true}>开</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="字体大小" name="fontSize">
        <Button icon={<ZoomInOutlined />}></Button>
        &nbsp;&nbsp;
        <Button icon={<ZoomOutOutlined />}></Button>
      </Form.Item>
      <Form.Item label="Tab大小" name="tabSize">
        <Select defaultValue="2">
          <Option value="2">2格</Option>
          <Option value="4">4格</Option>
        </Select>
      </Form.Item>
    </Form>
  );
  return (
    <Popover
      className="setting-selector"
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={() => setVisible(!visible)}
    >
      <Button type="primary" icon={<SettingFilled />} className="btn"></Button>
    </Popover>
  );
};

export default SettingSelector;
