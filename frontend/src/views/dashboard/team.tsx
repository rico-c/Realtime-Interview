import React, { FC, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Tag, List, Button } from "antd";
import TeamSelector from "@/components/common/teamSelector";
import { getTeamInfo } from '@/actions';
import { CardWrapper } from '@/components/common/cardWrapper';
import {
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import "./team.scss";

const Team: FC = () => {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state: any) => state.currentteam);
  const [list, setList] = useState([]);
  const [userMobile, setUserMobile] = useState<string>('');

  // 获取当前团队中的成员
  useEffect(() => {
    if (currentTeam) {
      const requestTeaminfo = async () => {
        const teamInfo = await getTeamInfo(currentTeam.teamId) as any;
        setList(teamInfo.list)
      }
      requestTeaminfo();
    }
  }, [currentTeam.teamId]);

  const addTeamMember = () => {
    
  }

  const onAddChange = (e) => {
    setUserMobile(e.target.value);
  }

  return (
    <div className="team-page">
      <div className="header">
        <div className="header-left">
          <TeamSelector />
          <a className="c-gap-left-large">修改团队名称</a>
        </div>
      </div>
      <CardWrapper>
        <div className="team-wrapper">
          <div className="c-gap-bottom-large">
            <Input
              placeholder="输入要添加的团队成员邮箱，例如user@baidu.com"
              size="large"
              value={userMobile}
              onChange={onAddChange}
              addonAfter={<Button type="link" onClick={addTeamMember}>添加</Button>}
            />
          </div>
          <div>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={list}
              bordered={true}
              renderItem={item => (
                <List.Item actions={[<a key="list-loadmore-more">删除</a>]}>
                  <List.Item.Meta title={item.name} description={item.mobile} />
                  <Tag icon={<UserOutlined />} color="#2db7f5">管理员</Tag>
                  <Tag icon={<GlobalOutlined />} color="#87d068">创建人</Tag>
                </List.Item>
              )}
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};

export default Team;
