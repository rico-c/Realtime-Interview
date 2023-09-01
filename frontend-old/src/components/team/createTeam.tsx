import React, { useState } from 'react';
import { CardWrapper } from '@/components/common/cardWrapper';
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { postCreateTeam } from 'actions';
import { useUserInfo } from 'hooks/useLogin';
import {
  LeftOutlined
} from '@ant-design/icons';
import './createTeam.scss';

export const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const history = useHistory();
  const { userId } = useUserInfo();
  const onChange = e => {
    setTeamName(e.target.value);
  }
  const confirmCreate = async (change: boolean) => {
    if (teamName) {
      await postCreateTeam({
        userId,
        teamName
      })
      if (change) {
        history.go(-1);
      }
      else {
        history.go(-1);
      }
    }
  }
  return (
    <div className="create-team">
      <div className="header">
        <div className="header-left">
          <Button type="link" onClick={_ => history.go(-1)}>
            <LeftOutlined />
            <span>返回</span>
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="header-title">创建新团队</span>
        </div>
      </div>
      <div className="half-wrapper">
        <CardWrapper>
          <div className="create-wrapper">
            <div className="c-gap-bottom-large">
              <Input
                placeholder="输入新团队的名字"
                size="large"
                value={teamName}
                onChange={onChange}
              />
            </div>
            <div className="create-btn">
              <Button type="primary" onClick={_ => confirmCreate(false)}>创建</Button>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  )
}