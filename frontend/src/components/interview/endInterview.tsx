import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { Rate, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { endInterview } from '@/actions';

const { TextArea } = Input;

interface EndProp {
  closeModal?: any;
  roomId: any;
}

const EndInterview: FC<EndProp> = props => {
  const { closeModal, roomId } = props;
  const [rateNumber, setRateNumber] = useState(0);
  const [comment, setComment] = useState('');

  const history = useHistory();

  const rateChange = useCallback(rate => {
    setRateNumber(rate);
    console.log(rate);
  }, []);

  const onFinish = useCallback(() => {
    const endParams = {
        roomId,
        rate: rateNumber*10,
        comment
    };
    endInterview(endParams);
    history.push(`/result/${roomId}`);
  }, [comment, rateNumber]);
  return (
    <div className="end-interview">
      <Rate
        allowHalf
        count={10}
        onChange={rateChange}
        style={{ fontSize: '30px' }}
      />
      <span
        className="c-gap-left-large"
        style={{ fontWeight: 500, fontSize: '20px' }}
      >
        {rateNumber ? rateNumber * 10 : '未评'}分
      </span>
      <div className="c-gap-top c-gap-bottom">
        <TextArea
          rows={4}
          placeholder="对候选人的评语，可包含优缺点，是否推荐进入下一轮面试"
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          size="large"
          htmlType="submit"
          type="primary"
          className="c-gap-right"
          onClick={onFinish}
        >
          确认结束
        </Button>
        <Button size="large" onClick={closeModal}>
          取消
        </Button>
      </div>
    </div>
  );
};

export default EndInterview;
