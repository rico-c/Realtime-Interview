import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { Table, Tag, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInterviews } from '@/actions';
import moment from 'moment';
import './writtenTable.scss';

const InterviewTable: FC = () => {
  const history = useHistory();
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInterviews(teamId));
  }, [teamId]);

  const dataList = useSelector(state => (state as any).interview.list);
  const statusDic = useMemo(() => {
    return {
      1: '未开始',
      2: '进行中',
      3: '已结束'
    };
  }, []);

  const enterInterview = id => {
    history.push(`/interview/${id}`);
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "roomId",
    //   key: "roomId"
    // },
    {
      title: '试卷',
      dataIndex: 'examName',
      key: 'examName'
    },
    {
      title: '发卷人',
      dataIndex: 'sender',
      key: 'sender'
    },
    {
      title: '发卷时间',
      dataIndex: 'sendtime',
      key: 'sendtime',
      sorter: (a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: time => (
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
      render: index => <span>{statusDic[index]}</span>
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
    <div className="table">
      <Table
        className="table-list"
        columns={columns}
        dataSource={dataList}
        rowKey={row => row.roomId}
      />
    </div>
  );
};

export default InterviewTable;
