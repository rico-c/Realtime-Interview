import React, { FC } from "react";
import './manageExam.scss';
import { Button, Table, Space } from "antd";
import { useHistory } from 'react-router-dom';
import BackBtn from 'components/common/backBtn';
import BreadNavigator from 'components/common/breadNavigator';

const ManageExam: FC = () => {
  const history = useHistory();
  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'examname',
      key: 'examname'
    },
    {
      title: '题目数量',
      dataIndex: 'questionsCounts',
      key: 'questionsCounts',
    },
    {
      title: '已发笔试',
      dataIndex: 'sendedCounts',
      key: 'sendedCounts',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'act',
      key: 'act',
      render: (text, record) => (
        <Space size="middle">
          <a>预览</a>
          <a>发卷</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  const data = [
    {
      sendedCounts: '1',
      examname: 'John Brown',
      questionsCounts: 32,
      dataIndex: 'New York No. 1 Lake Park'
    }
  ];

  const createExam = () => {
    history.push('/dashboard/createexam');
  }

  const breadData = [{
    name: '笔试',
    path: '/dashboard/writtenexamlist'
  }, {
    name: '管理试卷',
    path: '/dashboard/manageexam'
  }]

  return (
    <div className="manage-exam">
      <div className="manage-exam-header c-gap-bottom-large">
        <BackBtn />
        <Button type="primary" size="large" onClick={createExam}>创建试卷</Button>
      </div>
      <div className="c-gap-bottom">
        <BreadNavigator data={breadData} />
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default ManageExam;