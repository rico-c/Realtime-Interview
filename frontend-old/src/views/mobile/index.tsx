import React from 'react';
import LOGO from 'assets/logo/logo.png';
import CHART from 'assets/states/chart.png';
import { Footer } from 'components/homepage/footer';
import './index.scss';

const Mobile = () => {
  return (
    <div className="mobile">
      <img src={LOGO} style={{width: '200px',marginBottom: '25px'}} />
      <div style={{textAlign: 'center'}}>
        <img src={CHART} style={{width: '60%'}} />
      </div>
      <div className="notice">
        <h3>为了您更好的面试体验，</h3>
        <h3>请在电脑端访问我们的页面</h3>
        <br/>
        <h4>https://www.realtimeinterview.work</h4>
      </div>
      <Footer />
    </div>
  )
};

export default Mobile;
