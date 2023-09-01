import React, { FC, useCallback } from "react";
import { List, Avatar, Button } from "antd";
import { useHistory } from "react-router-dom";
import TeamSelector from '@/components/common/teamSelector';
import {useTeamQuestions} from '@/hooks';
import { useSelector } from 'react-redux';
import './questions.scss';

const Questions: FC = () => {
  const history = useHistory();
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const questionList = useTeamQuestions(teamId);
  
  const goCreate = useCallback(
    () => {
      history.push('/dashboard/createquestion');
    },
    [],
  )

  return (
    <div className="questions">
      <div className="questions-header">
        <TeamSelector />
        <Button type="primary" size="large" onClick={goCreate}>创建笔试题</Button>
      </div>
      <div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={questionList}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-look">查看</a>, <a key="list-edit">编辑</a>, <a key="list-delete">删除</a>]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
              <div>{item.note}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Questions;