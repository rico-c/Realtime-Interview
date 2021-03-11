import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Popover,
  Button,
  Select,
  Modal,
  Switch,
  Input,
  TimePicker,
  DatePicker,
  Form,
  message
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./interviewHeader.scss";
import { createInterview, createRoomid, updateTeam, fetchInterviews } from "@/actions";

const { Option } = Select;

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => (state as any).accout.userId);
  const teamIds = useSelector(state => (state as any).accout.teamId);
  const currentTeamId = useSelector(state => (state as any).interview.currentTeam);

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [copied, setCopy] = useState(false);
  const [roomId, setroomId] = useState("");

  const currentTeam = useSelector(
    state => (state as any).interview.currentTeam
  );

  useEffect(() => {
    if (teamIds && teamIds.length >= 1) {
      dispatch(updateTeam(teamIds[0]));
    }
  }, [teamIds]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const createInterviewNow = useCallback(async () => {
    setVisible(false);
    const roomid = await createRoomid(userId);
    if (!roomid) {
      message.error('创建面试ID失败');
    }
    const res = await createInterview({
      id: roomid,
      creator: userId,
      teamId: currentTeam,
      type: 2
    });
    if (res.code === 0) {
      history.push(`/interview/${roomid}`)
    }
    else {
      message.error('创建失败，请稍后再试');
    }
  }, []);

  const createInterviewReservation = useCallback(async () => {
    setVisible(false);
    const roomid = await createRoomid(userId);
    if (!roomid) {
      message.error('创建面试ID失败');
    }
    setroomId(roomid);
    setIsModalVisible(true);
  }, []);

  const handleTeamChange = useCallback(async value => {
    console.log(value);
    dispatch(updateTeam(value));
  }, []);

  const onFinish = useCallback(
    async values => {
      console.log(values);
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
        teamId: currentTeam,
        type: 1
      });
      console.log(res);
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

  const content = (
    <div
      style={{
        width: "150px"
      }}
    >
      <Button
        className="create-button"
        type="primary"
        style={{
          width: "100%",
          marginBottom: "10px"
        }}
        onClick={createInterviewNow}
      >
        立即开始
      </Button>
      <br />
      <Button
        className="create-button"
        type="primary"
        ghost
        style={{
          width: "100%"
        }}
        onClick={createInterviewReservation}
      >
        预约面试
      </Button>
    </div>
  );

  return (
    <div className="header">
      <div>
        {teamIds && currentTeam ? (
          <Select
            defaultValue={currentTeam}
            className="team-seletor"
            bordered={false}
            onChange={handleTeamChange}
          >
            {teamIds.map(i => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        ) : null}
      </div>
      <Popover
        content={content}
        placement="bottom"
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button type="primary" size="large">
          新建面试
        </Button>
      </Popover>
      <Modal
        title="创建预约面试"
        width={800}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
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
              {roomId}
            </span>
            <CopyToClipboard
              style={{
                cursor: "pointer"
              }}
              text={roomId}
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
                <TimePicker format={"HH:mm"} />
              </Form.Item>
            </div>
            <div
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
            </div>
          </div>
          <div style={{ textAlign: "center", width: "70%", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Form.Item
                label="面试者信息"
                name="joinerName"
                style={{ width: "40%" }}
                rules={[{ required: true, message: "请输入姓名" }]}
              >
                <Input placeholder="面试者姓名" />
              </Form.Item>
              <Form.Item
                name="joinerEmail"
                style={{ width: "55%" }}
                rules={[{ required: true, message: "请输入邮箱" }]}
              >
                <Input
                  addonBefore={<MailOutlined />}
                  placeholder="example@host.com"
                />
              </Form.Item>
            </div>
            <div
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
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
