import React, { FC, useCallback, useEffect, useState } from 'react';
import QuestionEditor from '@/components/questions/questionEditor';
import {
  Button,
  Input,
  Radio
} from "antd";
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons';
import './judgeQuestion.scss';

const SingleQuestion: FC = () => {
  const AlphaIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  const [options, setOption] = useState(['', '']);
  const [title, setTitle] = useState('');
  const [correctOption, setCorrectOption] = useState(-1);
  const onAnswerChange = useCallback(
    (e) => {
      const answer = e.target.value;
      const index = AlphaIndex.indexOf(answer);
      setCorrectOption(index);
    },
    [],
  )

  const addOption = useCallback(
    () => {
      if (options.length <= 13) {
        setOption([...options, '']);
      }
    },
    [options],
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

  return (
    <div className="judge-question">
      <div className="create-title">题目标题：</div>
      <Input onChange={e => setTitle(e.target.value)} />
      <div className="create-title">题目内容：</div>
      <QuestionEditor />
      <div className="create-title">选项：</div>
      {
        options.map((item, index) => <div className="single-item" key={item + index}>{AlphaIndex[index]}：<Input onChange={(e) => optionUpdate(e, index)} /><CloseSquareFilled /></div>)
      }
      {options.length <= 13 && <Button type="primary" icon={<PlusOutlined />} onClick={addOption}>
        增加选项
      </Button>}
      <div className="create-title">正确答案：</div>
      <Radio.Group onChange={onAnswerChange}>
        {
          options.map((item, index) => <Radio key={item + index} value={AlphaIndex[index]}>{AlphaIndex[index]}</Radio>)
        }
      </Radio.Group>
      <div className="c-gap-top"><Button type="primary">完成创建</Button></div>
    </div>
  );
};

export default SingleQuestion;
