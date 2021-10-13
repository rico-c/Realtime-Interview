import React, { useState, useCallback } from 'react'
import {
  Button,
  Switch,
  Input,
  TimePicker,
  DatePicker,
  Form,
  message
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import locale from "antd/es/date-picker/locale/zh_CN";
import { useUserInfo } from "@/hooks/useLogin";
import { useSelector, useDispatch } from "react-redux";
import { createInterview, fetchInterviews } from "@/actions";

export const OrderInterview = ({ roomId, setIsModalVisible }: { roomId: string; setIsModalVisible: (boolean) => void }) => {
  const dispatch = useDispatch();
  const [copied, setCopy] = useState(false);
  const userId = useUserInfo()['userId'];
  const currentTeamId = useSelector(state => (state as any).currentteam.teamId);
  const onFinish = useCallback(
    async values => {
      if (!userId) {
        message.error("缺少创建者用户信息，请稍后再试");
        return;
      }
      if (!roomId) {
        message.error("缺少面试ID信息，请稍后再试");
        return;
      }
      const res = await createInterview({
        info: values,
        id: roomId,
        creator: userId,
        teamId: currentTeamId,
        type: 1
      });
      if (res.code === 0) {
        message.success("创建成功");
        setIsModalVisible(false);
        dispatch(fetchInterviews(currentTeamId));
      } else {
        message.error(res.message);
      }
    },
    [roomId, userId]
  );
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div>
          <span>面试链接：</span>
          <span
            style={{
              padding: "6px 10px",
              borderBottom: "1px solid #d9d9d9",
              marginRight: "10px"
            }}
          >
            {window.location.origin + '/interview/' + roomId}
          </span>
          <CopyToClipboard
            style={{
              cursor: "pointer"
            }}
            text={window.location.origin + '/interview/' + roomId}
            onCopy={() => setCopy(true)}
          >
            {copied ? (
              <Button>已拷贝</Button>
            ) : (
              <Button type="primary">拷贝</Button>
            )}
          </CopyToClipboard>
        </div>
      </div>
      <Form onFinish={onFinish}>
        <div
          style={{
            textAlign: "center",
            width: "70%",
            margin: "0 auto"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Form.Item
              name="date"
              label="面试时间"
              rules={[{ required: true, message: "请输入日期" }]}
            >
              <DatePicker style={{ marginRight: "20px" }} locale={locale} />
            </Form.Item>
            <Form.Item
              name="time"
              rules={[{ required: true, message: "请输入时间" }]}
            >
              <TimePicker format={"HH:mm"} minuteStep={5} showNow />
            </Form.Item>
          </div>
        </div>
        <div style={{ textAlign: "center", width: "70%", margin: "0 auto" }}>
          <div>
            <Form.Item
              label="面试者信息"
              name="joinerName"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="面试者姓名" />
            </Form.Item>
            {/* <Form.Item
              label="面试者邮箱"
              name="joinerEmail"
              rules={[{ required: true, message: "请输入邮箱" }]}
            >
              <Input
                addonBefore={<MailOutlined />}
                placeholder="example@host.com"
              />
            </Form.Item> */}
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Form.Item
              name="sendMail"
              label="创建后立即发送预约邮件给面试者"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch
                defaultChecked
                checkedChildren="是"
                unCheckedChildren="否"
              />
            </Form.Item>
          </div> */}
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Form.Item
              name="mailRemind"
              label="面试前10分钟提醒"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch
                defaultChecked
                checkedChildren="是"
                unCheckedChildren="否"
              />
            </Form.Item>
          </div> */}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </div>
      </Form>
    </>
  )
}