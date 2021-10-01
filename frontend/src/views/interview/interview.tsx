import React, { FC, useState, useCallback, useRef, useMemo } from 'react';
import CodeEditor from '@/components/interview/codeeditor';
import Terminal from '@/components/interview/terminal';
import Markdown from '@/components/interview/markdown';
import VideoCall from '@/components/interview/videoCall';
import InvitePopover from '@/components/interview/invitePopover';
import { UserTab } from '@/components/interview/userTab';
import SplitPane from 'react-split-pane';
import { useSelector } from 'react-redux';
import { Radio, Button, Popover } from 'antd';
import { UserAddOutlined, ClearOutlined } from '@ant-design/icons';
import { useSocket, useInterviewDetail } from '@/hooks';
import { useParams } from 'react-router-dom';
import './interview.scss';

const Interview: FC = () => {

  const userAccount = useSelector(state => (state as any).accout);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [type, setType] = useState('terminal');
  const { roomId }: { roomId: string } = useParams();
  const ternimalRef = useRef({});
  const interviewDetail = useInterviewDetail(roomId);
  const socket = useSocket(roomId);
  const handleInviteVisibleChange = useCallback(value => {
    setInviteVisible(value);
  }, []);

  const onTypeChange = useCallback(type => {
    setType(type.target.value);
  }, []);

  const clearTerminal = useCallback(() => { (ternimalRef as any).current.clear() }, [])

  return (
    <div className="interview">
      <SplitPane split="vertical" defaultSize={'50%'}>
        <CodeEditor socket={socket} roomId={roomId} />
        <div className="right-area">
          <div className="top-bar">
            <div className="top-left">
              <Radio.Group
                defaultValue="terminal"
                buttonStyle="solid"
                className="c-gap-right"
                onChange={onTypeChange}
              >
                <Radio.Button value="terminal">终端</Radio.Button>
                <Radio.Button value="note">笔记</Radio.Button>
              </Radio.Group>
              <VideoCall />
            </div>
            <div className="top-right">
              <Button className="c-gap-right" ghost icon={<ClearOutlined />} onClick={clearTerminal} >清空终端</Button>
              <Popover
                content={InvitePopover}
                placement="bottomRight"
                trigger="click"
                visible={inviteVisible}
                onVisibleChange={handleInviteVisibleChange}
              >
                <Button icon={<UserAddOutlined />}>邀请面试者</Button>
              </Popover>

              <UserTab userAccount={userAccount} socket={socket} />
            </div>
          </div>
          <div
            style={{
              display: type === 'terminal' ? 'block' : 'none',
              height: '100%',
              overflowY: 'scroll'
            }}
          >
            <Terminal socket={socket} ternimalRef={ternimalRef} />
          </div>
          <div
            style={{
              display: type === 'note' ? 'block' : 'none',
              height: '100%',
              overflow: 'scroll'
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
