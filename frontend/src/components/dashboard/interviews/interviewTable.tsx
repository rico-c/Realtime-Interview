import React, { FC, useCallback, useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from "@/actions";
import "./interviewTable.scss";

const InterviewTable: FC = () => {
  const teamId = useSelector(state => (state as any).accout.teamId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInterviews(teamId));
  }, [teamId]);
  const dataList = useSelector(state => (state as any).interview.list);
  console.log(dataList);
  const columns = [
    {
      title: "面试者",
      dataIndex: "joiner",
      key: "joiner"
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime"
    },
    {
      title: "创建人",
      dataIndex: "createMan",
      key: "createMan"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => enterInterview(record.key)}>进入面试</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  const enterInterview = id => {
    console.log(id);
  };

  return (
    <div className="table">
      <Table class="table-list" columns={columns} dataSource={dataList} />
    </div>
  );
};

export default InterviewTable;
