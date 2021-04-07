import React, { FC, useCallback } from "react";
import { List, Avatar, Button } from "antd";
import { useHistory } from "react-router-dom";
import './questions.scss';

const Questions: FC = () => {
  const history = useHistory();

  const questionList = [{
    language: 'js',
    questionName: '冒泡排序',
    creator: 'rico',
    type: 'select',
    description: '考察算法能力',
    content: '请写一个冒泡排序,给定一个函数var function a = () => {return }'
  }]

  const goCreate = useCallback(
    () => {
      history.push('/dashboard/createquestion');
    },
    [],
  )

  return (
    <div className="questions">
      <div><Button type="primary" size="large" onClick={goCreate}>创建笔试题</Button></div>
      <div>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={questionList}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-look">查看</a>, <a key="list-edit">编辑</a>, <a key="list-delete">删除</a>]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.questionName}</a>}
                description={item.description}
              />
              <div>{item.content}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Questions;