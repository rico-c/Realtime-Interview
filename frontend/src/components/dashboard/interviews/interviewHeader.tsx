import React, { FC, useCallback, useState } from "react";
import { Popover, Button, Select, Modal, Switch, Input, TimePicker, DatePicker } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import moment from 'moment';
import "./interviewHeader.scss";

const { Option } = Select;

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopy] = useState(false);
  const readyCopyText = 'http://www.realtime-interview.com/interview/SHXBZUAJQWNSBXGA';
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const createInterviewNow = useCallback(
    () => {
      setVisible(false);
      console.log(1);
    },
    [],
  )

  const createInterviewReservation = useCallback(
    () => {
      setVisible(false);
      setIsModalVisible(true);
    },
    [],
  )

  const onDateChange = useCallback(
    (date) => {
      console.log(date);
    },
    [],
  )

  const onTimeChange = useCallback(
    (time) => {
      console.log(time);
    },
    [],
  )

  const onRemindChange = useCallback(
    (checked) => {
      console.log(checked);
    },
    [],
  )

  const content = (
    <div style={{
      width: '150px'
    }}>
      <Button className="create-button" type="primary" style={{
        width: '100%',
        marginBottom: '10px'
      }} onClick={createInterviewNow}>立即创建</Button>
      <br />
      <Button className="create-button" type="primary" ghost style={{
        width: '100%'
      }} onClick={createInterviewReservation}>预约面试</Button>
    </div>
  );

  return (
    <div className="header">
      <div>
        <Select defaultValue="malexa" className="team-seletor" bordered={false}>
          <Option value="malexa">百度-Malexa团队</Option>
        </Select>
      </div>
      <Popover
        content={content}
        placement="bottom"
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button type="primary" size="large">新建面试</Button>
      </Popover>
      <Modal
        title="创建预约面试"
        width={800}
        visible={isModalVisible}
        footer={null}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div>面试链接：</div>
          <div>
            <span style={{ padding: "6px 10px", borderBottom: "1px solid #d9d9d9", marginRight: "10px" }}>
              {readyCopyText}
            </span>
            <CopyToClipboard
              style={{
                cursor: 'pointer'
              }}
              text={readyCopyText}
              onCopy={() => setCopy(true)}>
              {copied ? <Button>已拷贝</Button> : <Button type="primary">拷贝</Button>}
            </CopyToClipboard>
          </div>
        </div>
        <div style={{ textAlign: 'center',width: '70%', margin: '0 auto 30px auto'}}>
          <div>面试时间：</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DatePicker onChange={onDateChange} style={{marginRight: '20px'}}/>
            <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} onChange={onTimeChange}/>
          </div>
          <div>
            <span>面试前10分钟提醒：<Switch defaultChecked onChange={onRemindChange} /></span>
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '70%', margin: '0 auto'}}>
          <div>面试者信息：</div>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <Input placeholder="面试者姓名" style={{width: '40%'}}/>
            <Input addonBefore={<MailOutlined />} placeholder="example@host.com" style={{ width: '55%' }}/>
          </div>
          <div>
            <span>发送预约邮件给面试者：<Switch defaultChecked onChange={onRemindChange} /></span>
          </div>
        </div>
        <div style={{ textAlign: 'center',marginTop: '20px' }}><Button type="primary">确定</Button></div>
      </Modal>
    </div>
  )
}

export default Header;