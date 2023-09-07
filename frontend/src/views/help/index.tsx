import React, { useState, useEffect } from 'react';
import Header from 'components/header/header';
import { Footer } from 'components/homepage/footer';
import { Menu } from 'antd';
import '../home/home.scss';
import './index.scss';
import Markdown from 'markdown-it';
import { useParams } from 'react-router-dom';

import progressForBoss from 'documents/progressforboss.md';
import manageTeam from 'documents/manageTeam.md';
import questions from 'documents/questions.md';
import progress from 'documents/progress.md';
import enviroment from 'documents/enviroment.md';
import price from 'documents/price.md';
import qa from 'documents/qa.md';
import feedback from 'documents/feedback.md';
import contract from 'documents/contract.md';

const markdown = new Markdown();

const dic = {
  progressForBoss,
  manageTeam,
  progress,
  questions,
  enviroment,
  price,
  qa,
  feedback,
  contract
}

const Help = () => {
  const {type} = useParams<{type: string}>();
  const [html, setHtml] = useState<string>('');
  const [key, setKey] = useState<string>('progressForBoss');
  const handleMenuClick = ({ item, key }) => {
    setKey(key);
  }

  useEffect(() => {
    setKey(type);
  }, [type])

  useEffect(() => {
    fetch(dic[key] || progressForBoss).then(res => res.text()).then(text => setHtml(markdown.render(text)));
  }, [key])

  return (
  <div className="help">
    <div className="help-wrapper">
      <Header />
      <div className="help-main">
        <Menu
          onClick={handleMenuClick}
          style={{ width: 256 }}
          mode="inline"
        >
          <Menu.ItemGroup key="g1" title="面试官">
            <Menu.Item key="progressForBoss">面试流程</Menu.Item>
            <Menu.Item key="manageTeam">管理团队</Menu.Item>
            <Menu.Item key="questions">题库</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="面试者">
            <Menu.Item key="progress">面试流程</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g3" title="其他">
            <Menu.Item key="enviroment">浏览器环境要求</Menu.Item>
            <Menu.Item key="price">价格</Menu.Item>
            <Menu.Item key="qa">Q&A</Menu.Item>
            <Menu.Item key="feedback">联系我们/反馈问题</Menu.Item>
            <Menu.Item key="contract">用户使用协议</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
  </div>)
}

export default Help;