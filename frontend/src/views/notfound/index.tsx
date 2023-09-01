import React, { useState, useEffect } from 'react';
import Header from 'components/header/header';
import { Footer } from 'components/homepage/footer';
import '../home/home.scss';
import IMG from 'assets/states/404.png';
import { useHistory } from 'react-router';

const Help = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, [])
  return (<div className="home">
    <div className="home-wrapper">
      <Header />
      <div style={{textAlign:'center', paddingTop: '50px'}}>
        <img src={IMG} alt="" />
        <h3>抱歉，该页面不存在，3秒后将跳回主页</h3>
      </div>
    </div>
    <Footer />
  </div>)
}

export default Help;