import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Select
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateTeam } from "@/actions";
import './teamSelector.scss';

const { Option } = Select;

const TeamSelector: FC = () => {
  const dispatch = useDispatch();
  const belongTeams = useSelector(state => (state as any).accout.belongTeams);

  const currentTeam = useSelector(
    state => (state as any).interview.currentTeam
  );

  useEffect(() => {
    if (belongTeams && belongTeams.length >= 1) {
      dispatch(updateTeam(belongTeams[0].teamId));
    }
  }, [belongTeams]);

  const handleTeamChange = useCallback(async value => {
    dispatch(updateTeam(value));
  }, []);


  return (
    <div className="team-selector">
      {belongTeams && belongTeams.length && currentTeam ? (
        <Select
          defaultValue={currentTeam}
          bordered={true}
          size="large"
          onChange={handleTeamChange}
        >
          {belongTeams.map((i: any) => (
            <Option value={i.teamId} key={i.teamId}>
              {i.teamName}
            </Option>
          ))}
        </Select>
      ) : null}
    </div>
  );
};

export default TeamSelector;
