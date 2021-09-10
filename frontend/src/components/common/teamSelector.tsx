import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Select
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { currentTeam } from "@/actions";
import './teamSelector.scss';

const { Option } = Select;

const TeamSelector: FC = () => {
  const dispatch = useDispatch();
  const belongTeams = useSelector(state => (state as any).accout.belongTeams) || [];

  const currentTeamId = useSelector(
    state => (state as any)?.currentteam?.teamId
  );

  const handleTeamChange = useCallback(async value => {
    const teamInfo = belongTeams.find(i => i.teamId === value);
    dispatch(currentTeam(teamInfo));
  }, []);


  return (
    <div className="team-selector">
      <Select
        value={currentTeamId}
        bordered={false}
        size="large"
        onChange={handleTeamChange}
      >
        {belongTeams.map((i: any) => (
          <Option value={i.teamId} key={i.teamId}>
            {i.teamName}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default TeamSelector;
