import React, { FC, useCallback, useEffect, useState } from 'react';
import QuestionEditor from '@/components/questions/questionEditor';
import {
  Button,
  Input,
  Radio
} from "antd";

const MultipleQuestion: FC = () => {
  const onAnswerChange = () => { }
  return (
    <div className="judge-question">
      <div className="create-title">题目标题：</div>
      <Input />
      <div className="create-title">题目内容：</div>
      <QuestionEditor setEditorContent={null}/>
      <div className="create-title">选项：</div>
      <div className="single-item">A：正确</div>
      <div className="single-item">B：错误</div>
      <div className="create-title">正确答案：</div>
      <Radio.Group onChange={onAnswerChange}>
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
      </Radio.Group>
      <div className="c-gap-top"><Button type="primary">完成创建</Button></div>
    </div>
  );
};

export default MultipleQuestion;
