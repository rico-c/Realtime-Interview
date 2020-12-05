import React, { FC, useCallback, useState } from "react";
import { Table, Tag, Space } from 'antd';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./interviewTable.scss";

const InterviewTable: FC = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '面试者',
      dataIndex: 'joiner',
      key: 'joiner',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '创建人',
      dataIndex: 'createMan',
      key: 'createMan',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => enterInterview(record.key)}>进入面试</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const data = [];

  const enterInterview = (id) => {
    console.log(id);
  }
 
  return (
    <div className="table">
      <Table class="table-list" columns={columns} dataSource={data} />
    </div>
  )
}

export default InterviewTable;