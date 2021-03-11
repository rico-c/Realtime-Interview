import React, { FC, useCallback, useEffect, useState } from 'react';
import Editor from 'for-editor';
import domToPdf from 'dom-to-pdf';

import './finalReport.scss';

interface FinalReportProps {
  data: any;
}

const FinalReport: FC<FinalReportProps> = props => {
  const { data } = props;
  useEffect(() => {
    var element = document.getElementById('finalReport');
    var options = {
      filename: 'test.pdf'
    };
    domToPdf(element, options, function () {
      console.log('done');
    });
  }, [])
  return (
    <div className="final-report" id="finalReport">
      <div className="title"><b>{data.joinerName}的面试报告</b></div>
      <div style={{
        textAlign: 'center',
        fontSize: '16px'
      }}><b>{data.joinerName}的面试报告</b></div>
      <div>

      </div>
      {/* <Editor
        {...config}
        value={value}
        onChange={handleChange}
        onSave={handleSave}
      /> */}
    </div>
  );
};

export default FinalReport;
