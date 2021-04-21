import React, { FC, useCallback, useEffect, useState } from 'react';
import QuestionEditor from '@/components/questions/questionEditor';
import {
  Button,
  Input,
  Radio,
  message
} from "antd";
import { createQuestion } from '@/actions/question';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const AnswerQuestion: FC = () => {
  const userId = useSelector(state => (state as any).accout.userId);
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const finishCreate = useCallback(
    () => {
      if (!title) {
        message.warning('请输入标题');
        return;
      }
      console.log(editorContent);
      if (!editorContent) {
        message.warning('请输入题目内容');
        return;
      }
      // 题目类型 1:判断题 2:单选题 3:多选题 4:问答题 5:编程题
      const requestCreate = async () => {
        const res = await createQuestion({
          type: 4,
          title,
          content: editorContent,
          note,
          creator: userId,
          teamId
        });
        if (res) {
          history.push('/dashboard/questions');
        }
      }
      requestCreate();
    },
    [title,editorContent],
  )

  return (
    <div className="judge-question">
      <div className="create-title">题目标题：</div>
      <Input onChange={e => setTitle(e.target.value)} />
      <div className="create-title">题目内容：</div>
      <QuestionEditor setEditorContent={setEditorContent} />
      <div className="create-title">备注（选填）：</div>
      <Input.TextArea onChange={e => setNote(e.target.value)} placeholder="备注内容仅面试官可见" />
      <div className="c-gap-top"><Button type="primary" onClick={finishCreate}>完成创建</Button></div>
    </div>
  );
};

export default AnswerQuestion;
