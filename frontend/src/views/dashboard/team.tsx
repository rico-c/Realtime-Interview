import React, { FC, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Tag, List, Button, Popconfirm } from "antd";
import TeamSelector from "@/components/common/teamSelector";
import { getTeamInfo, postAddTeamMember, postRemovemember, renameTeam, login } from '@/actions';
import { CardWrapper } from '@/components/common/cardWrapper';
import {
  EditOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import "./team.scss";

const Team: FC = () => {
  const dispatch = useDispatch();
  const currentTeam = useSelector((state: any) => state.currentteam);
  const [list, setList] = useState([]);
  const [newName, setNewName] = useState<string>('');
  const [renamePopVisible, setRenamePopVisible] = useState<boolean>(false);
  const [teamCreator, setTeamCreator] = useState<string>(null);
  const [userMobile, setUserMobile] = useState<string>('');

  const teamInfo = useCallback(
    async () => {
      const teamInfo = await getTeamInfo(currentTeam.teamId) as any;
      setList(teamInfo.list)
      setTeamCreator(teamInfo?.info?.creator)
    },
    [currentTeam.teamId],
  )

  // 获取当前团队中的成员
  useEffect(() => {
    teamInfo();
  }, []);

  const addTeamMember = async () => {
    const res = await postAddTeamMember({
      mobile: userMobile,
      teamId: currentTeam.teamId
    })
    teamInfo();
  }

  const deleteMember = async (targetId) => {
    const res = await postRemovemember({
      teamId: currentTeam.teamId,
      userId: targetId
    })
    teamInfo();
  }

  const handleRename = async () => {
    const res = await renameTeam({
      teamId: currentTeam.teamId,
      name: newName
    })
    setRenamePopVisible(false);
    dispatch(login({
      mobile: '',
      password: '',
      rememberme: true
    }));
  }

  const onAddChange = (e) => {
    setUserMobile(e.target.value);
  }

  const changeNameDom = () => (<Input
    placeholder="请输入新名字"
    value={newName}
    onChange={e => setNewName(e.target.value)}
  />)

  return (
    <div className="team-page">
      <div className="header">
        <div className="header-left">
          <TeamSelector />
          <Popconfirm
            title={changeNameDom}
            visible={renamePopVisible}
            icon={<EditOutlined />}
            onConfirm={handleRename}
            onCancel={_ => setRenamePopVisible(false)}
          >
            <Button type="link" onClick={_ => setRenamePopVisible(true)}>
              修改团队名称
            </Button>
          </Popconfirm>
        </div>
      </div>
      <CardWrapper>
        <div className="team-wrapper">
          <div className="c-gap-bottom-large">
            <Input
              placeholder="输入要添加的团队成员手机号码"
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
                <List.Item actions={[<a key="list-loadmore-more" onClick={_ => deleteMember(item.userId)}>删除</a>]}>
                  <List.Item.Meta title={item.name} description={item.mobile} />
                  {/* <Tag icon={<UserOutlined />} color="#2db7f5">管理员</Tag> */}
                  {teamCreator === item.userId && <Tag icon={<GlobalOutlined />} color="#87d068">创建人</Tag>}
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
