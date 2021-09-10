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
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInterviews(teamId));
  }, [teamId]);

  const dataList = useSelector(state => (state as any).interview.interviewlist);
  const statusDic = useMemo(() => {
    return {
      1: '未开始',
      2: '进行中',
      3: '已结束'
    };
  }, []);

  const enterInterview = (id:any) => {
    history.push(`/interview/${id}`);
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "roomId",
    //   key: "roomId"
    // },
    {
      title: '面试者',
      dataIndex: 'joinerName',
      key: 'joinerName',
      render: (joinerName: string) => <span>{joinerName || '暂无'}</span>
    },
    {
      title: '面试者邮箱',
      dataIndex: 'joinerEmail',
      key: 'joinerEmail',
      render: (joinerEmail: string) => <span>{joinerEmail || '暂无'}</span>
    },
    {
      title: '面试时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a: any, b: any) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: (time: string) => (
        <span>
          {moment(time).format('MM月DD日 HH:mm')}
          {moment(time).isSame(moment(), 'd') && '（今天）'}
        </span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (index:any) => <span>{statusDic[index]}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '评语',
      dataIndex: 'comment',
      key: 'comment'
    },
    {
      title: '评分',
      dataIndex: 'rate',
      key: 'rate'
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.status === 3 ? (
            <a onClick={() => enterInterview(record.roomId)}>查看报告</a>
          ) : (
            <a onClick={() => enterInterview(record.roomId)}>进入面试</a>
          )}
          <a>删除</a>
        </Space>
      )
    }
  ];

  return (
    <CardWrapper>
      <Table
        className="table-list"
        sticky={true}
        columns={columns}
        dataSource={dataList}
        rowKey={row => row.roomId}
      />
    </CardWrapper>
  );
};

export default InterviewTable;
