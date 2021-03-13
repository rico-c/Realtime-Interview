import React, { FC, useCallback, useEffect, useState } from 'react';
import { useInterviewDetail } from '@/hooks';
import { useParams } from 'react-router-dom';
import markdown from 'markdown';
import domToPdf from 'dom-to-pdf';

import './finalReport.scss';

interface FinalReportProps {
  data: any;
  reportRef: any
}

const FinalReport: FC<FinalReportProps> = props => {
  const { data, reportRef } = props;
  const { roomId } = useParams();
  const interviewDetail = useInterviewDetail(roomId);
  console.log(interviewDetail);

  const download = useCallback(() => {
    var element = document.getElementById('finalReport');
    var options = {
      filename: 'test.pdf'
    };
    domToPdf(element, options, function () {
      console.log('报告已下载');
    });
  }, [])

  useEffect(() => {
    reportRef.current.download = download;
  }, [download]);

  const markdownHTML = interviewDetail && interviewDetail.note ? markdown.markdown.toHTML(interviewDetail.note) : '面试官没有留下笔记';

  return (
    <div className="final-report" id="finalReport">
      <h1 className="title">{data.joinerName}的面试报告</h1>
      <h2 className="title-1">基础信息</h2>
      <p>面试官：{}</p>
      <p>面试耗时：{}</p>
      <p>面试开始时间：{}</p>
      <p>面试完成时间：{}</p>
      <h2 className="title-1">候选人评价</h2>
      <p>候选人评分：<strong>{interviewDetail && interviewDetail.rate ? interviewDetail.rate + '分' : '暂无评分'}</strong></p>
      <p>候选人评价：{interviewDetail && interviewDetail.comment ? interviewDetail.comment : '暂无评价'}</p>
      <h2 className="title-1">面试记录</h2>
      <div dangerouslySetInnerHTML={{ __html: markdownHTML }} />
    </div>
  );
};

export default FinalReport;
