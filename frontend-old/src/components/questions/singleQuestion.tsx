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

const SingleQuestion: FC = () => {
  const AlphaIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
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

  const addOption = useCallback(
    () => {
      if (options.length <= 13) {
        setOption([...options, '']);
      }
    },
    [options],
  )

  const deleteOption = useCallback(
    (index) => {
      // 删除选项后需要重新选择正确答案
      setCorrectOption('');
      setOption(old => {
        const arr = lodash.cloneDeep(old);
        arr.splice(index, 1);
        return arr;
      })
    },
    [options, correctOption],
  )

  const optionUpdate = useCallback(
    (e, index) => {
      setOption(old => {
        old[index] = e.target.value;
        return old;
      })
    },
    [options],
  )

  const finishCreate = useCallback(
    () => {
      if (!title) {
        message.warning('请输入标题');
        return;
      }
      if (options.length < 2) {
        message.warning('选项必须多于两个');
        return;
      }
      if (options.length > options.filter(i => i).length) {
        message.warning('有选项为空');
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
      // 题目类型 1:判断题 2:单选题 3:多选题 4:问答题 5:编程题
      const requestCreate = async () => {
        const res = await createQuestion({
          type: 2,
          title,
          content: editorContent,
          options: options,
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
      {
        options.map((item, index) => <div className="single-item" key={item + index}>{AlphaIndex[index]}：<Input onChange={(e) => optionUpdate(e, index)} defaultValue={item} /><CloseSquareFilled className="delete-icon" onClick={() => deleteOption(index)} /></div>)
      }
      {options.length <= 13 && <Button type="primary" icon={<PlusOutlined />} onClick={addOption}>
        增加选项
      </Button>}
      <div className="create-title">正确答案：</div>
      <Radio.Group onChange={onAnswerChange} defaultValue={correctOption}>
        {
          options.map((item, index) => <Radio key={item + index} value={AlphaIndex[index]}>{AlphaIndex[index]}</Radio>)
        }
      </Radio.Group>
      <div className="create-title">备注（选填）：</div>
      <Input.TextArea onChange={e => setNote(e.target.value)} placeholder="备注内容仅面试官可见" />
      <div className="c-gap-top"><Button type="primary" onClick={finishCreate}>完成创建</Button></div>
    </div>
  );
};

export default SingleQuestion;
