import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button, Dropdown, Menu } from 'antd';
import { useParams } from 'react-router-dom';
import { useInterviewDetail } from '@/hooks';
import './result.scss';

const InterviewResult: FC = () => {
  const { roomId } = useParams();
  const history = useHistory();
  const interviewDetail = useInterviewDetail(roomId);
  const goDashboard = useCallback(() => {
    history.push('/dashboard/list');
  }, []);
  const downloadReport = useCallback(() => {
    const reportHTML = interviewDetail;
    
  }, []);
  console.log(roomId);
  return (
    <div className="Result">
      <Result
        status="success"
        title="面试已完成！"
        subTitle="您可以下载本次面试报告，或在控制台中查看详情"
        extra={[
          <Button type="primary" key="console" onClick={goDashboard}>
            前往控制台
          </Button>,
          <Button key="report" onClick={downloadReport}>
            下载面试报告
          </Button>,
        ]}
      />
    </div>
  );
};

export default InterviewResult;
