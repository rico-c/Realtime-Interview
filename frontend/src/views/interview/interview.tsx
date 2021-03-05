import React, { FC, useMemo, useEffect, useState, useCallback } from 'react';
import CodeEditor from '@/components/interview/codeeditor';
import Terminal from '@/components/interview/terminal';
import Markdown from '@/components/interview/markdown';
import Videotalk from '@/components/interview/videotalk';
import InvitePopover from '@/components/interview/invitePopover';
import SplitPane from 'react-split-pane';
import { useSelector, useDispatch } from 'react-redux';
import { Radio, Button, Popover } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useSocket } from '@/hooks/useSocket';
// import io from "socket.io-client";
import { useParams } from 'react-router-dom';

import './interview.scss';

const Interview: FC = () => {
  const myName = useSelector(state => (state as any).accout.name);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [type, setType] = useState('terminal');
  const { roomId } = useParams();
  //   const userId = useSelector(state => (state as any).accout.userId);

  const socket = useSocket(roomId);

  const handleInviteVisibleChange = useCallback(value => {
    setInviteVisible(value);
  }, []);

  const onTypeChange = useCallback(type => {
    setType(type.target.value);
  }, []);
  return (
    <div className="interview">
      <SplitPane split="vertical" defaultSize={'50%'}>
        <CodeEditor socket={socket} />
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
              <Videotalk />
            </div>
            <div className="top-right">
              <Popover
                content={InvitePopover}
                placement="bottomRight"
                trigger="click"
                visible={inviteVisible}
                onVisibleChange={handleInviteVisibleChange}
              >
                <Button icon={<UserAddOutlined />}>邀请</Button>
              </Popover>

              <span className="c-gap-left-large">
                <i className="online-icon" />
                <span className="c-gap-left-small">{myName}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              display: type === 'terminal' ? 'block' : 'none',
              height: '100%'
            }}
          >
            <Terminal socket={socket} />
          </div>
          <div
            style={{
              display: type === 'note' ? 'block' : 'none',
              height: '100%'
            }}
          >
            <Markdown />
          </div>
        </div>
      </SplitPane>
    </div>
  );
};

export default Interview;
