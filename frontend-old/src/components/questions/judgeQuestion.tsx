import React, { FC, useCallback, useEffect, useState } from 'react';
import QuestionEditor from '@/components/questions/questionEditor';
import {
  Button,
  Input,
  Radio,
  message
} from "antd";
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons';
import lodash from 'lodash';
import { createQuestion } from '@/actions/question';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const JudgeQuestion: FC = () => {
  const AlphaIndex = ['A', 'B'];
  const [options, setOption] = useState(['', '']);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const userId = useSelector(state => (state as any).accout.userId);
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const history = useHistory();

  const onAnswerChange = useCallback(
    (e) => {
      const answer = e.target.value;
      setCorrectOption(answer);
    },
    [correctOption],
  )

  const finishCreate = useCallback(
    () => {
      if (!title) {
        message.warning('请输入标题');
        return;
      }
      if (!correctOption) {
        message.warning('请输入正确答案');
        return;
      }
      if (!editorContent) {
        message.warning('请输入题目内容');
        return;
      }
      const requestCreate = async () => {
        const res = await createQuestion({
          type: 1,
          title,
          content: editorContent,
          note,
          creator: userId,
          teamId,
          answer: correctOption
        });
        if (res) {
          history.push('/dashboard/questions');
        }
      }
      requestCreate();
    },
    [options, correctOption, title],
  )

  return (
    <div className="judge-question">
      <div className="create-title">题目标题：</div>
      <Input onChange={e => setTitle(e.target.value)} />
      <div className="create-title">题目内容：</div>
      <QuestionEditor setEditorContent={setEditorContent} />
      <div className="create-title">选项：</div>
      <div className="single-item">A：正确</div>
      <div className="single-item">B：错误</div>
      <div className="create-title">正确答案：</div>
      <Radio.Group onChange={onAnswerChange} defaultValue={correctOption}>
        <Radio value="correct">正确</Radio>
        <Radio value="wrong">错误</Radio>
      </Radio.Group>
      <div className="create-title">备注（选填）：</div>
      <Input.TextArea onChange={e => setNote(e.target.value)} placeholder="备注内容仅面试官可见" />
      <div className="c-gap-top"><Button type="primary" onClick={finishCreate}>完成创建</Button></div>
    </div>
  );
};

export default JudgeQuestion;
