import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  Select
} from "antd";
import { TeamOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTeam, getBelongTeams } from "@/actions";
import { useHistory } from "react-router-dom";
import { useUserInfo } from 'hooks/useLogin';
import {
  PlusOutlined
} from '@ant-design/icons';
import './teamSelector.scss';

const { Option } = Select;

const TeamSelector = forwardRef((props, ref) => {
  const { userId } = useUserInfo();
  const history = useHistory();
  const dispatch = useDispatch();
  const [belongTeams, setBelongTeams] = useState([]);

  const currentTeamId = useSelector(
    state => (state as any)?.currentteam?.teamId
  );

  const initData = () => {
    getBelongTeams(userId).then(res => {
      setBelongTeams(res);
      let currentTeamData = res[0];
      if (res?.find(i => i.teamId === currentTeamId)) {
        currentTeamData = res.find(i => i.teamId === currentTeamId);
      }
      dispatch(setCurrentTeam(currentTeamData));
    });
  }

  useEffect(() => {
    initData();
  }, [])

  useImperativeHandle(ref, () => ({
    initData: initData
  }));

  const handleTeamChange = useCallback(async value => {
    if (value === 'createnewteam') {
      history.push('/dashboard/createteam')
    }
    else {
      const teamInfo = belongTeams.find(i => i.teamId === value);
      if (currentTeamId !== value) {
        dispatch(setCurrentTeam(teamInfo));
      }
    }
  }, [belongTeams, currentTeamId]);


  return (
    <div className="team-selector">
      <TeamOutlined  className="icon"/>
      {belongTeams && belongTeams.length ? <Select
        className="selector"
        value={currentTeamId}
        bordered={false}
        size="large"
        onSelect={handleTeamChange}
      >
        {belongTeams.map((i: any) => (
          <Option value={i.teamId} key={i.teamName}>
            {i.teamName}
          </Option>
        ))}
        <Option value="createnewteam" key="createnewteam">
          <PlusOutlined />新建团队
        </Option>
      </Select> : null}
    </div>
  );
});

export default TeamSelector;
