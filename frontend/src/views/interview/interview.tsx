import React, { FC, useMemo, useEffect, useState, useCallback,useRef } from 'react';
import CodeEditor from '@/components/interview/codeeditor';
import Terminal from '@/components/interview/terminal';
import Markdown from '@/components/interview/markdown';
import VideoCall from '@/components/interview/videoCall';
import InvitePopover from '@/components/interview/invitePopover';
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { tempuser } from '@/actions/accout';
import { Radio, Button, Popover, Modal, Input } from 'antd';
import { UserAddOutlined, ClearOutlined } from '@ant-design/icons';
import { useSocket,useInterviewDetail } from '@/hooks';
// import io from "socket.io-client";
import { useParams } from 'react-router-dom';

import './interview.scss';

const Interview: FC = () => {
  const dispatch = useDispatch();
  const userAccount = useSelector(state => (state as any).accout);
  const myName = userAccount.name;
  const userId = userAccount.userId;
  const [inviteVisible, setInviteVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState(false);
  const [type, setType] = useState('terminal');
  const { roomId } = useParams();
  const ternimalRef = useRef({});

  const interviewDetail = useInterviewDetail(roomId);

  useEffect(() => {
    if (userAccount.requested && !userAccount.name) {
      setIsModalVisible(true);
      return;
    }
    setIsModalVisible(false);
  }, [userAccount]);

  const socket = useSocket(roomId);
  const handleInviteVisibleChange = useCallback(value => {
    setInviteVisible(value);
  }, []);

  const onTypeChange = useCallback(type => {
    setType(type.target.value);
  }, []);

  const updateUsername = useCallback(n => {
    setUsername(n.target.value);
  }, []);

  const handleInputname = () => {
    if (username) {
      dispatch(tempuser(username));
    } else {
      return;
    }
    setIsModalVisible(false);
  };

  const modalProps = useMemo(() => {
    return {
      visible: isModalVisible,
      onOk: handleInputname,
      maskClosable: false,
      closable: false,
      title: '输入您的名字并加入面试',
      width: 400
    };
  }, [isModalVisible]);

  const clearTerminal = useCallback(() => ternimalRef.current.clear(), [])

  const ModalFooter = (
    <Button type="primary" onClick={handleInputname} disabled={!username}>
      确认
    </Button>
  );

  return (
    <div className="interview">
      <Modal {...modalProps} footer={ModalFooter}>
        <Input placeholder="名字将显示给面试官" onChange={updateUsername} />
      </Modal>
      <SplitPane split="vertical" defaultSize={'50%'}>
        <CodeEditor socket={socket} roomId={roomId} />
        <div className="right-area">
          <div className="top-bar">
            <div className="top-left">
              {userId ? (
                <Radio.Group
                  defaultValue="terminal"
                  buttonStyle="solid"
                  className="c-gap-right"
                  onChange={onTypeChange}
                >
                  <Radio.Button value="terminal">终端</Radio.Button>
                  <Radio.Button value="note">笔记</Radio.Button>
                </Radio.Group>
              ) : null}
              <VideoCall />
            </div>
            <div className="top-right">
              <Button className="c-gap-right" icon={<ClearOutlined />} onClick={clearTerminal} >清空终端</Button>
              <Popover
                content={InvitePopover}
                placement="bottomRight"
                trigger="click"
                visible={inviteVisible}
                onVisibleChange={handleInviteVisibleChange}
              >
                <Button icon={<UserAddOutlined />}>邀请</Button>
              </Popover>

              {myName && (
                <span className="c-gap-left-large">
                  <i className="online-icon" />
                  <span className="c-gap-left-small">{myName}</span>
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: type === 'terminal' ? 'block' : 'none',
              height: '100%'
            }}
          >
            <Terminal socket={socket} ternimalRef={ternimalRef} />
          </div>
          <div
            style={{
              display: type === 'note' ? 'block' : 'none',
              height: '100%'
            }}
          >
            <Markdown interviewDetail={interviewDetail} />
          </div>
        </div>
      </SplitPane>
    </div>
  );
};

export default Interview;
