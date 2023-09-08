import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import {Link} from 'react-router-dom';
import { WidthButton } from '../common/widthBtn';
import { useDispatch } from "react-redux";
import { register } from 'actions/accout'
import { useLoginJump } from 'hooks/useLogin';
import { checkRegister } from 'utils/checkValidate'
import { getUrlParam } from 'utils/GetUrlParams';
import { useTranslation } from "react-i18next";

export const Register = ({ setLogin }: { setLogin: (boolean) => void }) => {
  const dispatch = useDispatch();
  const [help, setHelp] = useState<string>('');
  const { t } = useTranslation("common");

  const onRegister = (values) => {
    const checkRes = checkRegister(values);
    if (!checkRes.state) {
      return setHelp(checkRes.msg);
    }
    dispatch(register(values) as any);
  }
  const roomId = getUrlParam('r');
  useLoginJump(roomId);

  const HelpCom = () => <div className="help-word">{help}</div>;

  return (
    <div className="register">
      <h1>{t('signupnew')}</h1>
      <Form
        className="form"
        labelCol={{ span: 5}}
        onFinish={onRegister}
        initialValues={{ readProtocol: false }}
        size="large"
      >
        <Form.Item name="name" label={t('name')}>
          <Input placeholder={t('showname')} className="input" />
        </Form.Item>

        <Form.Item name="mobile" label={t('mobile')}>
          <Input placeholder={t('mobile')} className="input" />
        </Form.Item>

        <Form.Item name="password" label={t('pass')}>
          <Input placeholder={t('pass')} className="input" type="password" />
        </Form.Item>

        <Form.Item name="repeatpassword" help={<HelpCom />} label={t('pass-confirm')}>
          <Input placeholder={t('pass-confirm')} className="input" type="password" />
        </Form.Item>

        <Form.Item>
          <WidthButton type="primary" htmlType="submit" size="large">
            {t('signup')}
          </WidthButton>
        </Form.Item>
        <Form.Item valuePropName="checked" name="readProtocol">
          <Checkbox> {t('readaccept')}<Link to="/help/contract" target="_blank"> {t('contract')}</Link></Checkbox>
        </Form.Item>
      </Form>
      <Button type="link" className="float-right" onClick={() => setLogin(true)}>
        {t('hasaccount')}
      </Button>
    </div>
  )
}