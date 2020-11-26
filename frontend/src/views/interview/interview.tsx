import React, { FC, useMemo, useEffect } from "react";
import { useInterviewId } from '@/hooks';
import CodeEditor from '@/components/interview/codeeditor';
import Terminal from '@/components/interview/terminal';
import Videotalk from '@/components/interview/videotalk';
import SplitPane from 'react-split-pane';
import { Input } from 'antd';

import './interview.scss';

const { TextArea } = Input;

const Interview: FC = () => {
  const id = useInterviewId();

  useEffect(() => {
    const setUp = async () => {
      try {

      }
      catch (err) {
        throw err;
      }
    }
    setUp();
  }, [])

  return (
    <div className="interview">
      <Videotalk />
      <SplitPane split="vertical" defaultSize={'50%'}>
        <CodeEditor />
        {/* <SplitPane split="horizontal" defaultSize={'50%'}> */}
        <Terminal />
          {/* <TextArea rows={20} placeholder="笔记板..."/> */}
        {/* </SplitPane> */}
      </SplitPane>
    </div>
  )
}

export default Interview;