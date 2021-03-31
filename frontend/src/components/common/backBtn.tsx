import React, { FC, useCallback } from "react";
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import './backBtn.scss';

const BackBtn: FC = () => {
  const history = useHistory();

  const backPage = useCallback(() => {
    history.go(-1);
  }, [])

  return (
    <div className="back-btn" onClick={backPage}>
      <LeftOutlined style={{ fontSize: '20px'}} />
      <span style={{ fontSize: '16px'}}>返回上页</span>
    </div>
  )
}

export default BackBtn;