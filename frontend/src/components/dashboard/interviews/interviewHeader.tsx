import React, { useCallback, useState } from "react";
import {
  Popover,
  Button,
  message,
  Drawer,
  Input
} from "antd";
import TeamSelector from '@/components/common/teamSelector';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "moment/locale/zh-cn";
import "./interviewHeader.scss";
import { createInterview, createRoomid } from "@/actions";
import { OrderInterview } from "./orderInterview";
import { useUserInfo } from "@/hooks/useLogin";

const { Search } = Input;

const Header = (params: {
  setQuery: any
}) => {
  const { setQuery } = params;
  const history = useHistory();
  const userId = useUserInfo()['userId'];

  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomId, setroomId] = useState("");

  const currentTeam = useSelector(
    state => (state as any).currentteam
  );

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
      teamId: currentTeam.teamId,
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

  const onSearch = (value) => {
    console.log(value);
    setQuery(value);
  }

  const popContent = (
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
      <div className="header-left">
        <span className="header-title">面试列表</span>
        <Search allowClear size="middle" placeholder="搜索面试者" onSearch={onSearch} style={{ width: 300 }} />
      </div>
      <div className="header-right">
        <TeamSelector />
        <Popover
          content={popContent}
          placement="bottom"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button type="primary" size="large">
            新建面试
          </Button>
        </Popover>
      </div>
      <Drawer
        title="新建预约面试"
        placement="right"
        width="550"
        closable={false}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      >
        <OrderInterview roomId={roomId} setIsModalVisible={setIsModalVisible} />
      </Drawer>
    </div>
  );
};

export default Header;
