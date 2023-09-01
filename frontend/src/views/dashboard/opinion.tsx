import React, { useState } from 'react';
import { CardWrapper } from 'components/common/cardWrapper';
import { Input, Button} from 'antd';
import { createOpinion } from 'actions'
import { useUserInfo} from 'hooks/useLogin';

const { TextArea } = Input;

const Opinion = () => {
  const [txt, setTxt] = useState<string>('');
  const txtChange = (e) => {
    setTxt(e.target.value)
  }
  const { userId } = useUserInfo();
  const submit = () => {
    if (!!txt) {
      createOpinion({
        userId,
        opinion: txt,
        time: new Date()
      })
      setTxt('');
    }
  }
  return (<div className="setting-page">
    <div className="header">
      <div className="header-left">
        <span className="header-title">反馈意见</span>
      </div>
    </div>
    <div className="half-wrapper">
      <CardWrapper>
        <div style={{padding: '10px'}}>
          <strong>感谢您的宝贵意见！</strong>
          <TextArea rows={6} placeholder="请在这里输入意见反馈或遇到的BUG" style={{ margin: '10px 0' }} value={txt} onChange={txtChange} />
          <Button type="primary" style={{float: 'right'}} onClick={submit}>提交</Button>
        </div>
      </CardWrapper>
    </div>
  </div>)
}
export default Opinion;