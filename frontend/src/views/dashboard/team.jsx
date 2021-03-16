import React, { FC, useCallback, useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Select, Skeleton, List } from "antd";
import { updateTeam } from "@/actions";
import "./team.scss";

const { Option } = Select;

const Team: FC = () => {
  const dispatch = useDispatch();
  const teamIds = useSelector(state => state.accout.teamId);
  const currentTeam = useSelector(state => state.interview.currentTeam);
  const [list, setList] = useState([]);
  const handleTeamChange = useCallback(async value => {
    dispatch(updateTeam(value));
  }, []);

  useEffect(() => {
    if (teamIds && teamIds.length >= 1) {
      dispatch(updateTeam(teamIds[0]));
      setList([{
        name: 'caoyu',
        email: 'caoyu15@baidu.com'
      }, {
        name: 'casad',
        email: 'asd'
      }])
    }
  }, [teamIds]);

  return (
    <div className="team-page">
      <div className="c-gap-bottom-large">
        {teamIds && currentTeam ? (
          <Select
            size="large"
            defaultValue={currentTeam}
            className="team-seletor"
            bordered={true}
            onChange={handleTeamChange}
          >
            {teamIds.map(i => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        ) : null}
        <a className="c-gap-left-large">修改团队名称</a>
      </div>
      <div className="c-gap-bottom-large">
        <Input
          placeholder="输入要添加的团队成员邮箱，例如user@baidu.com"
          size="large"
          addonAfter={<span>添加</span>}
        />
      </div>
      <div>
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          bordered={true}
          renderItem={item => (
            <List.Item actions={[<a key="list-loadmore-more">删除</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta title={item.name} description={item.email} />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Team;
