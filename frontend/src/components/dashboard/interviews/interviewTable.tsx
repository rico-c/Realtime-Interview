import React, { useState, useEffect, useMemo } from 'react';
import { Table, Tag, Space, Popconfirm, message, Drawer, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInterviews, deleteInterview } from 'actions';
import { CardWrapper } from 'components/common/cardWrapper';
import moment from 'moment';
import FinalReport from 'components/result/finalReport';
import { UpdateInterview } from 'components/dashboard/interviews/updateInterview';
import './interviewTable.scss';
import { useTranslation } from "react-i18next";

const InterviewTable = (params: { query: string }) => {
  const query = params.query;
  const history = useHistory();
  const teamId = useSelector(state => (state as any)?.currentteam?.teamId);
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation('common')

  const [reportVisible, setreportVisible] = useState<string | null>(null);
  const [configVisible, setconfigVisible] = useState<string | null>(null);

  const updateInterviewsData = () => dispatch(fetchInterviews(teamId) as any);

  const dataList = useSelector(state => (state as any).interview.interviewlist);
  const queryDataList = useMemo(() => {
    if (query) {
      return dataList.filter(i => {
        return i.joinerName ? i.joinerName.indexOf(query) !== -1 : false;
      })
    } else {
      return dataList;
    }
  }, [dataList, query]);
  const statusDic = useMemo(() => {
    return {
      1: { txt: '未开始', color: '#FFB7A9' },
      2: { txt: t('ongoing'), color: '#92B6AC' },
      3: { txt: '已结束', color: '#94ABB5' }
    };
  }, []);

  const enterInterview = (id: string) => {
    history.push(`/interview/${id}`);
  };

  const doDeleteInterview = async (id: string) => {
    await deleteInterview(id);
    updateInterviewsData();
    message.success('删除成功');
  };

  useEffect(() => {
    updateInterviewsData()
  }, [teamId]);

  const columns = [
    {
      title: t('state'),
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      width: '80px',
      render: (index: any) => <Tag color={statusDic[index].color}>{statusDic[index].txt}</Tag>
    },
    {
      title: t('interview-id'),
      dataIndex: "roomId",
      key: "roomId"
    },
    {
      title: t('joiner'),
      dataIndex: 'joinerName',
      key: 'joinerName',
      ellipsis: true,
      render: (joinerName: string) => <span>{joinerName || '-'}</span>
    },
    {
      title: t('interview-time'),
      dataIndex: 'time',
      key: 'time',
      ellipsis: false,
      sorter: (a: any, b: any) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime(),
      render: (time: string) => (
        <span>
          {moment(time).format('YYYY/MM/DD HH:mm')}&nbsp;
          {moment(time).isSame(moment(), 'd') && <Tag>今天</Tag>}
        </span>
      )
    },
    {
      title: t('creator'),
      dataIndex: 'name',
      ellipsis: true,
      key: 'name'
    },
    {
      title:t('rate') ,
      dataIndex: 'rate',
      key: 'rate',
      render: (text, record) => (
        <span>{text === 0 ? 0 : text ? text : '-'}</span>
      )
    },
    {
      title: t('comment'),
      dataIndex: 'comment',
      key: 'comment',
      render: (text, record) => (
        <span>{text ? text : '-'}</span>
      )
    },
    {
      title: t('operate'),
      key: 'action',
      width: '250px',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.status === 3 ? (
            <Button onClick={_ => setreportVisible(record.roomId)}>查看报告{record.note && '/笔记'}</Button>
          ) : (
            <Button onClick={_ => enterInterview(record.roomId)} type="primary" ghost>{t('interview-enter')}</Button>
          )}
          <Button onClick={_ => setconfigVisible(record.roomId)} type="link">{t('modify')}</Button>
          <Popconfirm
            title="删除后不可恢复"
            onConfirm={_ => doDeleteInterview(record.roomId)}
            okText="确认删除"
            cancelText="取消"
          >
            <a>{t('delete')}</a>
          </Popconfirm>
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
        dataSource={queryDataList}
        rowKey={row => row.roomId}
        pagination={false}
      />
      <Drawer
        placement="right"
        width="600"
        closable={true}
        onClose={_ => setreportVisible(null)}
        visible={!!reportVisible}
      >
        <FinalReport propRoomId={reportVisible} />
      </Drawer>
      <Drawer
        placement="right"
        width="600"
        closable={true}
        onClose={_ => setconfigVisible(null)}
        visible={!!configVisible}
      >
        <UpdateInterview roomId={configVisible} setconfigVisible={setconfigVisible} updateInterviewsData={updateInterviewsData} />
      </Drawer>
    </CardWrapper>
  );
};

export default InterviewTable;
