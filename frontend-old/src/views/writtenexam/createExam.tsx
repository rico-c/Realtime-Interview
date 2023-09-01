
import React, { FC, useCallback } from "react";
import './createExam.scss';
import { Button, Form, Input, InputNumber, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import BackBtn from '@/components/common/backBtn';
import BreadNavigator from '@/components/common/breadNavigator';
import SplitPane from 'react-split-pane';
const { TextArea } = Input;

const CreateExam: FC = () => {
  const breadData = [{
    name: '笔试',
    path: '/dashboard/writtenexamlist'
  }, {
    name: '管理试卷',
    path: '/dashboard/manageexam'
  }, {
    name: '创建试卷',
    path: '/dashboard/createexam'
  }]
  const onFinish = useCallback(() => { }, [])
  return (
    <div className="create-exam">
      <div className="create-exam-header c-gap-bottom-large">
        <BackBtn />
      </div>
      <div className="c-gap-bottom">
        <BreadNavigator data={breadData} />
      </div>
      <div className="main-area">
        <SplitPane split="vertical" defaultSize={'50%'} minSize={200}>
          <div className="form-area">
            <Form
              name="basic"
              onFinish={onFinish}
            >
              <Form.Item
                label="试卷名称"
                name="examname"
                rules={[{ required: true, message: '请输入试卷名称' }]}
              >
                <Input className="form-width" />
              </Form.Item>
              <Form.Item
                label="笔试时长"
                name="examspend"
                rules={[{ required: true, message: '请输入笔试时长' }]}
              >
                <InputNumber min={1} defaultValue={60} />
              </Form.Item>
              <Form.Item
                label="笔试前说明"
                name="description"
              >
                <TextArea rows={3} className="form-width" />
              </Form.Item>
              <Form.Item
                label="开启摄像头监控"
                name="cameraMonitor"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
              <Form.Item
                label="切屏时提醒候选人"
                name="changetabNotice"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  确认创建
            </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="">
            questions
          </div>
        </SplitPane>
      </div>
    </div>
  )
}

export default CreateExam;