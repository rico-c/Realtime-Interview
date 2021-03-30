import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  message
} from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "moment/locale/zh-cn";
import "./writtenHeader.scss";
import TeamSelector from '@/components/common/teamSelector';


const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => (state as any).accout.userId);
  const teamIds = useSelector(state => (state as any).accout.teamId);
  const currentTeamId = useSelector(state => (state as any).interview.currentTeam);

  const currentTeam = useSelector(
    state => (state as any).interview.currentTeam
  );

  return (
    <div className="header">
      <TeamSelector />
      <div>
        <Button type="primary" size="large">管理试卷</Button>
      </div>
    </div>
  );
};

export default Header;
