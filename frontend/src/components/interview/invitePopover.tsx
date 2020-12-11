import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import "./invitePopover.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";

const InvitePopover: FC = () => {
  const { roomId } = useParams();
  const [copied, setCopy] = useState(false);
  console.log(roomId);
  return (
    <div className="invite-popover">
      <div>
        <b>通过链接邀请：</b>
      </div>
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
      <div>
        <b>通过发送邮件邀请：</b>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "spaceBetween"
        }}
      >
        <Input
          placeholder="email@domain.com"
          style={{
            marginRight: "5px"
          }}
        />
        <Button type="primary">发送</Button>
      </div>
    </div>
  );
};

export default InvitePopover;
