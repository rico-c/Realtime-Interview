import React, { FC, useCallback, useState } from "react";
import { Popover, Button, Select, Modal, Switch, Input, TimePicker, DatePicker, Form } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "./interviewHeader.scss";
import { createInterview, createRoomid } from '@/actions';

const { Option } = Select;

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopy] = useState(false);
  const [roomUrl, setroomUrl] = useState('');
  const userid = useSelector(state => (state as any).accout.userid);
  
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
    async () => {
      setVisible(false);
      const roomid = await createRoomid(userid);
      setroomUrl(roomid);
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

  const onFinish = useCallback(
    (values) => {
      console.log(values);
      createInterview({ info: values, id: roomUrl});
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
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <b>面试链接：</b>
          <div>
            <span style={{ padding: "6px 10px", borderBottom: "1px solid #d9d9d9", marginRight: "10px" }}>
              {roomUrl}
            </span>
            <CopyToClipboard
              style={{
                cursor: 'pointer'
              }}
              text={roomUrl}
              onCopy={() => setCopy(true)}>
              {copied ? <Button>已拷贝</Button> : <Button type="primary">拷贝</Button>}
            </CopyToClipboard>
          </div>
        </div>
        <Form
          onFinish={onFinish}
        >
          <div style={{ textAlign: 'center', width: '70%', margin: '0 auto 30px auto' }}>
            <b>面试时间：</b>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
              <Form.Item
                name="date"
                rules={[{ required: true, message: '请输入面试者姓名' }]}
              >
                <DatePicker onChange={onDateChange} style={{ marginRight: '20px' }} locale={locale} />
              </Form.Item>
              <Form.Item
                name="time"
                rules={[{ required: true, message: '请输入时间' }]}
              >
                <TimePicker format={'HH:mm'} onChange={onTimeChange} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="mailRemind"
              >
                <span>面试前10分钟提醒：<Switch defaultChecked onChange={onRemindChange} /></span>
              </Form.Item>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '70%', margin: '0 auto' }}>
            <b>面试者信息：</b>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <Form.Item
                name="joinerName"
                style={{ width: '40%' }}
                rules={[{ required: true, message: '请输入面试者姓名' }]}
              >
                <Input placeholder="面试者姓名" />
              </Form.Item>
              <Form.Item
                name="joinerEmail"
                style={{ width: '55%' }}
                rules={[
                  { required: true, message: '请输入邮箱' }
                ]}
              >
                <Input addonBefore={<MailOutlined />} placeholder="example@host.com" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="sendMail"
              >
                <span>发送预约邮件给面试者：<Switch defaultChecked onChange={onRemindChange} /></span>
              </Form.Item>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}><Button type="primary" htmlType="submit">创建</Button></div>
        </Form>
      </Modal>
    </div>
  )
}

export default Header;