import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Select
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTeam } from "@/actions";
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
    if (currentTeamId !== value) {
      dispatch(setCurrentTeam(teamInfo));
    }
  }, [belongTeams, currentTeamId]);


  return (
    <div className="team-selector">
      <Select
        value={currentTeamId}
        bordered={false}
        size="large"
        onSelect={handleTeamChange}
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
