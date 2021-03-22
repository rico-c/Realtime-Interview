import React, { FC, useCallback } from 'react';
import { Tabs, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './questions.scss';

import MyQuestions from '@/components/qustions/MyQuestions';
import QuestionsCommunity from '@/components/qustions/QuestionsCommunity';

const { TabPane } = Tabs;

const Questions: FC = () => {
  const history = useHistory();
  const createQustion = useCallback(() => {
    history.push('/dashboard/createquestion');
  }, []);
  return (
    <div className="questions">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="我的题目" key="1">
          <MyQuestions />
        </TabPane>
        <TabPane tab="题目社区" key="2">
          <QuestionsCommunity />
        </TabPane>
      </Tabs>
      <Button
        type="primary"
        className="create-question-btn"
        size="large"
        onClick={createQustion}
      >
        创建题目
      </Button>
    </div>
  );
};

export default Questions;
