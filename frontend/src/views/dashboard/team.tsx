import React, { FC, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Select, Skeleton, List } from "antd";
import TeamSelector from "@/components/common/teamSelector";
import { getTeamInfo } from '@/actions';
import "./team.scss";

const Team: FC = () => {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state:any) => state.interview.currentTeam);
  const [list, setList] = useState([]);

  // 获取当前团队中的成员
  useEffect(() => {
    if (currentTeam) {
      // const teamInfo = dispatch(getTeamInfo(currentTeam)) as any;
      // setList(teamInfo)
    }
  }, [currentTeam]);

  return (
    <div className="team-page">
      <div className="c-gap-bottom-large">
        <TeamSelector />
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
