import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { Table, Tag, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInterviews } from '@/actions';
import { CardWrapper } from '@/components/common/cardWrapper';
import moment from 'moment';
import './interviewTable.scss';

const InterviewTable: FC = () => {
  const history = useHistory();
  const teamId = useSelector(state => (state as any)?.currentteam?.teamId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInterviews(teamId));
  }, [teamId, dispatch]);

  const dataList = useSelector(state => (state as any).interview.interviewlist);
  const statusDic = useMemo(() => {
    return {
      1: { txt: '未开始', color: 'default' },
      2: { txt: '进行中', color: '#2db7f5' },
      3: { txt: '已结束', color: '#87d068' }
    };
  }, []);

  const enterInterview = (id: string) => {
    history.push(`/interview/${id}`);
  };

  const reviewInterview = (id: string) => {
    console.log(id);
  };

  const deleteInterview = (id: string) => {
    console.log(id);
  };

  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      width: '80px',
      render: (index: any) => <Tag color={statusDic[index].color}>{statusDic[index].txt}</Tag>
    },
    {
      title: "面试间ID",
      dataIndex: "roomId",
      width: '140px',
      key: "roomId"
    },
    {
      title: '面试者',
      dataIndex: 'joinerName',
      key: 'joinerName',
      ellipsis: true,
      render: (joinerName: string) => <span>{joinerName || '暂无'}</span>
    },
    {
      title: '面试者邮箱',
      dataIndex: 'joinerEmail',
      key: 'joinerEmail',
      ellipsis: false,
      render: (joinerEmail: string) => <span>{joinerEmail || '暂无'}</span>
    },
    {
      title: '面试时间',
      dataIndex: 'time',
      key: 'time',
      ellipsis: false,
      sorter: (a: any, b: any) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: (time: string) => (
        <span>
          {moment(time).format('MM-DD HH:mm')}&nbsp;
          {moment(time).isSame(moment(), 'd') && <Tag color="cyan">今天</Tag>}
        </span>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      sorter: (a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: text => <span>{moment(text).format('MM-DD HH:mm')}</span>
    },
    {
      title: '创建人',
      dataIndex: 'name',
      ellipsis: true,
      key: 'name'
    },
    {
      title: '评分',
      dataIndex: 'rate',
      key: 'rate',
      width: '80px',
      render: (text, record) => (
        <span>{text === 0 ? 0 : text ? text : '未评分'}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: '165px',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.status === 3 ? (
            <a onClick={() => reviewInterview(record.roomId)}>查看报告{record.note && '/笔记'}</a>
          ) : (
            <a onClick={() => enterInterview(record.roomId)}>进入面试</a>
          )}
          <a onClick={() => deleteInterview(record.roomId)}>删除</a>
        </Space>
      )
    }
  ];

  return (
    <CardWrapper>
      <Table
        className="table-list"
        sticky={true}
        bordered={false}
        scroll={{ y: '100%' }}
        columns={columns}
        dataSource={dataList}
        rowKey={row => row.roomId}
        pagination={false}
      />
    </CardWrapper>
  );
};

export default InterviewTable;
