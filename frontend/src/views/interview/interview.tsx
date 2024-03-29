import React, { FC, useState, useCallback, useRef, useMemo } from 'react';
import CodeEditor from 'components/interview/codeeditor';
import Terminal from 'components/interview/terminal';
import Markdown from 'components/interview/markdown';
import VideoCall from 'components/interview/videoCall';
import InvitePopover from 'components/interview/invitePopover';
import { UserTab } from 'components/interview/userTab';
import SplitPane from 'react-split-pane';
import { useSelector } from 'react-redux';
import { Radio, Button, Popover } from 'antd';
import { UserAddOutlined, ClearOutlined, CodeOutlined, EditOutlined } from '@ant-design/icons';
import { useSocket, useInterviewDetail } from 'hooks';
import { useParams, useLocation } from 'react-router-dom';
import { useUserInfo } from 'hooks/useLogin';
import { getTeamInfo } from 'actions';
import { useTranslation } from "react-i18next";

import './interview.scss';

const Interview: FC = () => {

  const userAccount = useSelector(state => (state as any).accout);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [type, setType] = useState('terminal');
  const { roomId }: { roomId: string } = useParams();
  const { demo } = useLocation()?.state as any || { demo: false };
  const ternimalRef = useRef({});
  const interviewDetail = useInterviewDetail(roomId);
  const socket = useSocket(roomId);
  const { userId } = useUserInfo();
  const {t, i18n} = useTranslation('common')

  const handleInviteVisibleChange = useCallback(value => {
    setInviteVisible(value);
  }, []);

  const isEmployer = useMemo(async () => {
    if (interviewDetail) {
      const res = await getTeamInfo(interviewDetail.teamId);
      if (res?.info?.users?.includes(userId)) {
        return true;
      }
    }
    return false;
  }, [interviewDetail, userId])

  const onTypeChange = useCallback(type => {
    setType(type.target.value);
  }, []);

  const clearTerminal = useCallback(() => { (ternimalRef as any).current.clear() }, [])

  return (
    <div className="interview">
      <SplitPane split="vertical" defaultSize={'50%'}>
        <CodeEditor socket={socket} roomId={roomId} videocallDom={<VideoCall socket={socket} roomId={roomId} />} demo={demo} />
        <div className="right-area">
          <div className="top-bar">
            <div className="top-left">
              {(isEmployer || demo) && <Radio.Group
                defaultValue="terminal"
                buttonStyle="solid"
                optionType="button"
                className="c-gap-right"
                onChange={onTypeChange}
              >
                <Radio.Button value="terminal">
                  <CodeOutlined />{t('termial')}
                </Radio.Button>
                <Radio.Button value="note">
                  <EditOutlined />{t('note')}
                </Radio.Button>
              </Radio.Group>}
            </div>
            <div className="top-right">
              <Button className="c-gap-right" ghost icon={<ClearOutlined />} onClick={clearTerminal} >{t('clear-terminal')}</Button>
              <Popover
                content={InvitePopover as any}
                placement="bottomRight"
                trigger="click"
                visible={inviteVisible}
                onVisibleChange={handleInviteVisibleChange}
              >
                <Button icon={<UserAddOutlined />} ghost>{t('invite')}</Button>
              </Popover>

              <UserTab userAccount={userAccount} socket={socket} demo={demo} />
            </div>
          </div>
          <div
            className="right-container"
            style={{
              display: type === 'terminal' ? 'block' : 'none',
            }}
          >
            <Terminal socket={socket} ternimalRef={ternimalRef} />
          </div>
          <div
            className="right-container"
            style={{
              display: type === 'note' ? 'block' : 'none',
              overflowY: 'scroll'
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
