import React, { useState, useRef, useEffect } from 'react';
import { useInterviewDetail } from '@/hooks';
import { Input, message, Button, DatePicker, TimePicker } from 'antd';
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
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showTimeBtn, setShowTimeBtn] = useState<boolean>(false);

  useEffect(() => {
    if (interviewDetail) {
      setName(interviewDetail.joinerName)
      setTime(moment(interviewDetail.time))
      setOriginName(interviewDetail.joinerName)
      setOriginTime(moment(interviewDetail.time).format("YYYY-MM-DD HH:mm"))
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
    </div>
  )
}