import React, { FC, useCallback, useEffect, useState } from 'react';
import { useInterviewDetail } from 'hooks';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-it';
import { jsPDF } from "jspdf";
import moment from 'moment';

import './finalReport.scss';

interface FinalReportProps {
  propRoomId?: string;
  reportRef?: any
}
const markdown = new Markdown();

const FinalReport: FC<FinalReportProps> = props => {
  const { propRoomId, reportRef } = props;
  const { roomId }: {roomId: string} = useParams();
  const interviewDetail = useInterviewDetail(roomId || propRoomId);

  // const download = useCallback(() => {
  //   var element = document.getElementById('finalReport');
  //   var options = {
  //     filename: 'test.pdf'
  //   };
  //   const doc = new jsPDF();
  //   // domToPdf(element, options, function () {
  //   //   console.log('报告已下载');
  //   // });
  //   doc.html(element, {
  //     callback: function (doc) {
  //       doc.save();
  //     },
  //     filename: 'test',
  //     x: 10,
  //     y: 10
  //   });
  // }, [])

  // useEffect(() => {
  //   reportRef.current.download = download;
  // }, [download]);

  const markdownHTML = interviewDetail && interviewDetail.note ? markdown.render(interviewDetail.note) : '面试官没有留下笔记';

  return (
    <div className="final-report" id="finalReport">
      <h1 className="title">面试报告</h1>
      <h2 className="title-1">基础信息</h2>
      <p>面试官：{interviewDetail && interviewDetail.interviewer ? interviewDetail.interviewer : '暂无面试官'}</p>
      {/* <p>面试耗时：{}</p>
      <p>面试开始时间：{}</p> */}
      <p>面试完成时间：{interviewDetail && interviewDetail.endTime ? moment(interviewDetail.endTime).format('YYYY-MM-DD hh:mm') : '暂无面试官'}</p>
      <h2 className="title-1">候选人评价</h2>
      <p>候选人评分：<strong>{interviewDetail && interviewDetail.rate ? interviewDetail.rate + '分' : '暂无评分'}</strong></p>
      <p>候选人评价：{interviewDetail && interviewDetail.comment ? interviewDetail.comment : '暂无评价'}</p>
      <h2 className="title-1">面试记录</h2>
      <div dangerouslySetInnerHTML={{ __html: markdownHTML }} />
    </div>
  );
};

export default FinalReport;
