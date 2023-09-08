import React from 'react';
import {
  LoadingOutlined,
} from '@ant-design/icons';
import './loading.scss';
import LOGO from 'assets/logo/logo.png';
import { useTranslation } from "react-i18next";

export const Loading = () => {
  const {t, i18n} = useTranslation('common')
  return (
    <div className="wrapper">
      <div>
        <img src={LOGO} style={{ width: '200px' }} />
      </div>
      <div style={{ marginBottom: '20px' }}><strong>{t('loading')}...</strong></div>
      <LoadingOutlined className="icon" />
    </div>
  )
}