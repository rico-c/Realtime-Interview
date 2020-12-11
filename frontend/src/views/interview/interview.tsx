import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import CodeEditor from "@/components/interview/codeeditor";
import Terminal from "@/components/interview/terminal";
import Markdown from "@/components/interview/markdown";
import Videotalk from "@/components/interview/videotalk";
import InvitePopover from "@/components/interview/invitePopover";
import SplitPane from "react-split-pane";
import { useSelector, useDispatch } from "react-redux";
import { Radio, Button, Popover } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import "./interview.scss";

const Interview: FC = () => {
  const myName = useSelector(state => (state as any).accout.name);
  const [inviteVisible, setInviteVisible] = useState(false);
  const handleInviteVisibleChange = useCallback(value => {
    setInviteVisible(value);
  }, []);
  return (
    <div className="interview">
      <SplitPane split="vertical" defaultSize={"50%"}>
        <CodeEditor />
        <div className="right-area">
          <div className="top-bar">
            <div className="top-left">
              <Radio.Group defaultValue="terminal" buttonStyle="solid" className="c-gap-right">
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
          {/* <Terminal /> */}
          <Markdown />
        </div>
      </SplitPane>
    </div>
  );
};

export default Interview;
