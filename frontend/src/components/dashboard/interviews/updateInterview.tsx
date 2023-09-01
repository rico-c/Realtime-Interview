import React, { useState, useRef, useEffect } from 'react';
import { useInterviewDetail } from 'hooks';
import { Input, message, Button, DatePicker, TimePicker, Rate } from 'antd';
import { SettingItem } from 'components/setting/settingItem';
import locale from "antd/es/date-picker/locale/zh_CN";
import { updateInterview } from 'actions';
import moment from 'moment';

export const UpdateInterview = (props: { roomId: string; setconfigVisible: Function; updateInterviewsData: Function }) => {
  const { roomId, setconfigVisible, updateInterviewsData } = props;
  const interviewDetail = useInterviewDetail(roomId);

  const [name, setName] = useState<string>('');
  const [originName, setOriginName] = useState<string>('');
  const [time, setTime] = useState(null);
  const [originTime, setOriginTime] = useState(null);
  const [rate, setRate] = useState(null);
  const [originRate, setOriginRate] = useState(null);
  const [comment, setComment] = useState(null);
  const [originComment, setOriginComment] = useState(null);


  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showTimeBtn, setShowTimeBtn] = useState<boolean>(false);
  const [showRateBtn, setShowRateBtn] = useState<boolean>(false);
  const [showCommentBtn, setShowCommentBtn] = useState<boolean>(false);

  useEffect(() => {
    if (interviewDetail) {
      setName(interviewDetail.joinerName)
      setTime(moment(interviewDetail.time))
      setRate(interviewDetail.rate)
      setOriginName(interviewDetail.joinerName)
      setOriginTime(moment(interviewDetail.time).format("YYYY-MM-DD HH:mm"))
      setOriginRate(interviewDetail.rate)
      setComment(interviewDetail.comment)
      setOriginComment(interviewDetail.comment)
    }
  }, [interviewDetail])

  const confirmChangeName = async () => {
    await updateInterview({
      roomId,
      joinerName: name
    })
    message.success('修改成功');
    setconfigVisible(false);
    updateInterviewsData();
  }

  const confirmChangeRate = async () => {
    await updateInterview({
      roomId,
      rate: rate
    })
    message.success('修改成功');
    setconfigVisible(false);
    updateInterviewsData();
  }

  const confirmChangeComment = async () => {
    await updateInterview({
      roomId,
      comment
    })
    message.success('修改成功');
    setconfigVisible(false);
    updateInterviewsData();
  }

  const confirmChangeTime = async () => {
    await updateInterview({
      roomId,
      time: time.format("YYYY-MM-DD HH:mm")
    })
    message.success('修改成功');
    setconfigVisible(false);
    updateInterviewsData();
  }

  const handleDateChange = (date, dateString) => {
    setTime(date);
    const currentDateString = date.format("YYYY-MM-DD HH:mm");
    if (currentDateString === originTime) {
      setShowTimeBtn(false);
    }
    else {
      setShowTimeBtn(true);
    }
  }

  const handleNameChange = e => {
    const v = e.target.value;
    setName(v);
    if (originName === v) {
      setShowBtn(false);
    }
    else {
      setShowBtn(true);
    }
  }

  const handleCommentChange = e => {
    const v = e.target.value;
    setComment(v);
    if (originComment === v) {
      setShowCommentBtn(false);
    }
    else {
      setShowCommentBtn(true);
    }
  }

  const rateChange = (value) => {
    setRate(value * 10);
    if (value * 10 === originRate) {
      setShowRateBtn(false);
    }
    else {
      setShowRateBtn(true);
    }
  }

  return (
    <div>
      <p className="c-font-big c-font-bold">修改面试</p>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">候选人姓名</span>
          <span>
            <Input
              className="input"
              value={name}
              onChange={e => handleNameChange(e)}
              placeholder="请补充候选人姓名"
            />
            {showBtn && <Button type="link" onClick={confirmChangeName}>确认更改</Button>}
          </span>
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">面试时间</span>
          <span>
            <span>
              <DatePicker style={{ marginRight: "20px" }} locale={locale} value={time} onChange={handleDateChange} />
              <TimePicker format={"HH:mm"} minuteStep={5} showNow value={time} onChange={handleDateChange} />
            </span>
            {showTimeBtn && <Button type="link" onClick={confirmChangeTime}>确认更改</Button>}
          </span>
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">评分</span>
          <span>
            <Rate
              allowHalf
              count={10}
              value={rate ? rate / 10 : 0}
              onChange={rateChange}
            />
            <span
              className="c-gap-left-large"
              style={{ fontWeight: 500, fontSize: '20px' }}
            >
              {rate ? rate : '未评'}分
            </span>
            {showRateBtn && <Button type="link" onClick={confirmChangeRate}>确认更改</Button>}
          </span>
        </>
      </SettingItem>
      <SettingItem>
        <>
          <span className="c-font-medium c-color-gray-a">面试评价</span>
          <span>
            <Input
              value={comment}
              onChange={e => handleCommentChange(e)}
              placeholder="请填写评语"
              style={{width: '300px'}}
            />
            {showCommentBtn && <Button type="link" onClick={confirmChangeComment}>确认更改</Button>}
          </span>
        </>
      </SettingItem>
    </div>
  )
}