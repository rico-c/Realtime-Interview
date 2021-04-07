import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Radio
} from "antd";
import BackBtn from '@/components/common/backBtn';
import BreadNavigator from '@/components/common/breadNavigator';
import JudgeQuestion from '@/components/questions/judgeQuestion';
import SingleQuestion from '@/components/questions/singleQuestion';
import MultipleQuestion from '@/components/questions/multipleQuestion';
import AnswerQuestion from '@/components/questions/answerQuestion';
import CodeQuestion from '@/components/questions/codeQuestion';
import "./createQuestion.scss";


const CreateQuestion: FC = () => {
  const [type, changeType] = useState('judge');
  const breadData = [{
    name: '题库',
    path: '/dashboard/questions'
  }, {
    name: '创建笔试题',
    path: '/dashboard/createquestion'
  }];

  const handleTypeChange = useCallback((e) => {
    changeType(e.target.value);
  }, [])

  return (
    <div className="create-question">
      <div className="c-gap-bottom">
        <BackBtn />
      </div>
      <div className="c-gap-bottom">
        <BreadNavigator data={breadData} />
      </div>
      <div className="main-area">
        <div className="form-area">
          <div className="create-title">题目类型：</div>
          <Radio.Group defaultValue="judge" buttonStyle="solid" className="c-gap-bottom" onChange={handleTypeChange}>
            <Radio.Button value="judge">判断题</Radio.Button>
            <Radio.Button value="single">单选题</Radio.Button>
            <Radio.Button value="multiple">多选题</Radio.Button>
            <Radio.Button value="answer">问答题</Radio.Button>
            <Radio.Button value="code">编程题</Radio.Button>
          </Radio.Group>
          {type === 'judge' && <JudgeQuestion />}
          {type === 'single' && <SingleQuestion />}
          {type === 'multiple' && <MultipleQuestion />}
          {type === 'answer' && <AnswerQuestion />}
          {type === 'code' && <CodeQuestion />}
        </div>
        <div className="find-question">
          从题库池中导入
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
