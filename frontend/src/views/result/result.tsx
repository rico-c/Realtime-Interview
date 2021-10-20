import React, { FC, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useInterviewDetail } from '@/hooks';
import FinalReport from '@/components/result/finalReport';
import './result.scss';

const InterviewResult: FC = () => {
  const { roomId }:any = useParams();
  const history = useHistory();
  const reportRef = useRef({});
  const interviewDetail = useInterviewDetail(roomId);
  const goDashboard = useCallback(() => {
    history.push('/dashboard/interviewlist');
  }, []);
  const downloadReport = useCallback(() => {
    (reportRef as any).current.download();
  }, []);

  return (
    <div className="result">
      <Result
        status="success"
        title="面试已完成！"
        subTitle="您可以下载本次面试报告，或在控制台中查看详情"
        extra={[
          <Button type="primary" key="console" size="large" onClick={goDashboard}>
            前往控制台
          </Button>,
          // <Button key="report" onClick={downloadReport}>
          //   下载面试报告
          // </Button>,
        ]}
      />
      <div className="report-wrapper">
        {interviewDetail && <FinalReport reportRef={reportRef} />}
      </div>
    </div>
  );
};

export default InterviewResult;
