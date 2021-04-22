import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
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
import LanguageSelector from '@/components/common/languageSelector';
import MonacoEditor from 'react-monaco-editor';

const CodeQuestion: FC = () => {
  const userId = useSelector(state => (state as any).accout.userId);
  const teamId = useSelector(state => (state as any).interview.currentTeam);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [language, setLanguage] = useState(-1);
  const [editorContent, setEditorContent] = useState('');
  const [initialCode, setInitCode] = useState('');
  const [answerCode, setAnswerCode] = useState('');

  // TODO
  const currentLanguageHighlight = 'javascript';

  const editorOptions = useMemo(() => {
    return {
      selectOnLineNumbers: true,
      automaticLayout: true,
      readOnly: false,
      minimap: {
        enabled: false
      }
    };
  }, []);

  const onInitChange = useCallback((newValue, e) => {
    console.log(newValue)
    setInitCode(newValue);
  }, []);

  const onAnswerChange = useCallback((newValue, e) => {
    console.log(newValue)
    setAnswerCode(newValue);
  }, []);

  const finishCreate = useCallback(
    () => {
      if (!title) {
        message.warning('请输入标题');
        return;
      }
      if (language < 0) {
        message.warning('请选择代码语言');
        return;
      }
      if (!editorContent) {
        message.warning('请输入题目内容');
        return;
      }
      // 题目类型 1:判断题 2:单选题 3:多选题 4:问答题 5:编程题
      const requestCreate = async () => {
        const res = await createQuestion({
          type: 5,
          title,
          content: editorContent,
          note,
          language: language,
          creator: userId,
          answerCode: answerCode,
          initialCode: initialCode,
          teamId
        });
        if (res) {
          history.push('/dashboard/questions');
        }
      }
      requestCreate();
    },
    [title, editorContent],
  )

  return (
    <div className="judge-question">
      <div className="create-title">题目标题：</div>
      <Input onChange={e => setTitle(e.target.value)} />
      <div className="create-title">代码语言：</div>
      <LanguageSelector changeLanguage={setLanguage} />
      <div className="create-title">题目内容：</div>
      <QuestionEditor setEditorContent={setEditorContent} />
      <div className="create-title">为问题提供的初始代码：</div>
      <div style={{ height: '200px', border: '1px solid #ddd', borderRadius: '8px', padding: '5px',boxShadow: '#00000010 0px 0px 12px'}}>
        <MonacoEditor
          language={currentLanguageHighlight}
          options={editorOptions}
          onChange={onInitChange}
        />
      </div>
      <div className="create-title">参考答案：</div>
      <div style={{ height: '200px', border: '1px solid #ddd', borderRadius: '8px', padding: '5px',boxShadow: '#00000010 0px 0px 12px'}}>
        <MonacoEditor
          language={currentLanguageHighlight}
          options={editorOptions}
          onChange={onAnswerChange}
        />
      </div>
      <div className="create-title">备注（选填）：</div>
      <Input.TextArea onChange={e => setNote(e.target.value)} placeholder="备注内容仅面试官可见" />
      <div className="c-gap-top"><Button type="primary" onClick={finishCreate}>完成创建</Button></div>
    </div>
  );
};

export default CodeQuestion;
