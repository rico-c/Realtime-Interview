import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { Table, Tag, Space } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from "@/actions";
import moment from "moment";
import "./interviewTable.scss";

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
      1: "待开始",
      2: "进行中",
      3: "已结束"
    };
  }, []);

  const enterInterview = id => {
    history.push(`/interview/${id}`)
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "roomId",
      key: "roomId"
    },
    {
      title: "面试者",
      dataIndex: "joinerName",
      key: "joinerName"
    },
    {
      title: "面试者邮箱",
      dataIndex: "joinerEmail",
      key: "joinerEmail"
    },
    {
      title: "面试时间",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
      render: time => <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: index => <span>{statusDic[index]}</span>
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
      render: text => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: "创建人",
      dataIndex: "creator",
      key: "creator"
    },
    {
      title: "备注",
      dataIndex: "note",
      key: "note"
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => enterInterview(record.roomId)}>进入面试</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  return (
    <div className="table">
      <Table class="table-list" columns={columns} dataSource={dataList} rowKey={row => row.roomId}/>
    </div>
  );
};

export default InterviewTable;
