import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { tempuser } from '@/actions/accout';
import { useDispatch } from 'react-redux';
import { Button, Modal, Input, notification } from 'antd';
import { InterviewRoute } from 'types';
import { SmileOutlined, ExportOutlined } from '@ant-design/icons';

export const UserTab = ({ userAccount, socket }: { userAccount: any, socket: any }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myName = userAccount.name;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const { roomId } = useParams<InterviewRoute>();
  const jumpLogin = useCallback(() => {
    history.push(`/login?r=${roomId}`);
  }, [])

  const handleInputname = useCallback(() => {
    if (!!username) {
      dispatch(tempuser(username));
      socket?.emit('newuser', username)
    } else {
      return;
    }
    setIsModalVisible(false);
  }, [socket, username]);

  const modalProps = useMemo(() => {
    return {
      visible: isModalVisible,
      onOk: handleInputname,
      maskClosable: false,
      closable: false,
      title: '面试者：请输入您的名字',
      width: 400
    };
  }, [isModalVisible]);

  const updateUsername = useCallback(n => {
    setUsername(n.target.value);
  }, []);

  const openNotification = ({ username, state }: { username: string, state: 0 | 1 }) => {
    const dic = [{ message: '上线', icon: <SmileOutlined style={{ color: '#108ee9' }} /> }, { message: '下线', icon: <ExportOutlined /> }];
    notification.open({
      message: `${username}已${dic[state].message}`,
      icon: dic[state].icon,
      top: 60
    });
  };

  useEffect(() => {
    socket?.on('presentusers', users => {
      setOtherUsers(oldusers => {
        return users
      })
    })

    socket?.on('userjoined', username => {
      setOtherUsers(old => {
        if (!old.includes(username)) {
          return old.concat(username);
        }
        return old;
      })
      openNotification({ username, state: 0 })
    })

    socket?.on('userleft', username => {
      openNotification({ username, state: 1 })
    })
  }, [socket])

  useEffect(() => {
    if (!myName) {
      setIsModalVisible(true);
      return;
    }
    setIsModalVisible(false);
    socket?.emit('newuser', myName)
  }, [userAccount, socket, myName]);

  const ModalFooter = (
    <div style={{ width: '100%', display: 'flex', 'justifyContent': 'space-between' }}>
      <Button type="link" onClick={jumpLogin}>您是面试官？请点击这里登录</Button>
      <Button type="primary" onClick={handleInputname} disabled={!username}>
        确认
      </Button>
    </div>
  );
  return (
    <>
      <Modal {...modalProps} footer={ModalFooter}>
        <Input placeholder="您的名字将显示给面试官" onChange={updateUsername} />
      </Modal>
      {otherUsers.length ? otherUsers.filter(j => j !== myName).map(i => <span className="c-gap-left-large" key={i}>
        <i className="online-icon" />
        <span className="c-gap-left-small">{i}</span>
      </span >) : null}
      {myName ? (
        <span className="c-gap-left-large" >
          <i className="online-icon" />
          <span className="c-gap-left-small">{myName}</span>
        </span >
      ) : <Button type="link" className="c-gap-left-large" onClick={jumpLogin}>登录</Button>}
    </>

  )
}