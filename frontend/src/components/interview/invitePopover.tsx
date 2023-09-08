import React, { FC, useMemo, useEffect, useState, useCallback } from "react";
import "./invitePopover.scss";
import CopyToClipboard from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";

const InvitePopover: FC = () => {
  const roomId = window.location.href;
  const [copied, setCopy] = useState(false);
  const { t, i18n } = useTranslation("common");
  return (
    <div className="invite-popover flex items-center gap-2">
      <b>{t("invite-desc")}</b>
      <span
        style={{
          padding: "6px 10px",
          borderBottom: "1px solid #d9d9d9",
          margin: "10px",
        }}
      >
        {roomId}
      </span>
      <CopyToClipboard
        style={{
          cursor: "pointer",
        }}
        text={roomId}
        onCopy={() => setCopy(true)}
      >
        {copied ? (
          <Button>已拷贝</Button>
        ) : (
          <Button type="primary">{t("copy")}</Button>
        )}
      </CopyToClipboard>
    </div>
  );
};

export default InvitePopover;
