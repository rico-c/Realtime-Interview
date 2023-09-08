import React, { FC, useCallback } from "react";
import { Menu, Button } from 'antd';
import { useHistory } from "react-router-dom";
import Icon from "assets/logo/logo.png";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import {
  TranslationOutlined
} from '@ant-design/icons';
import "./header.scss";

const { SubMenu } = Menu;

const Header: FC = () => {
  const history = useHistory();
  const userId = useSelector(state => (state as any).accout.userId);
  const jumpRoute = useCallback((e) => {
    history.push(e.key);
  }, [])
  const { t, i18n } = useTranslation("common");

  const changeLang = () => {
    const changeTo = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(changeTo);
  }

  return (
    <div className="header">
      <div className="icon" onClick={() => history.push('/')}>
        <span className="logo-icon">
          <img className="logo-txt" src={Icon} />
        </span>
      </div>
      <div className="home-menu">
        <Menu onClick={jumpRoute} selectedKeys={[]} mode="horizontal" className="flex items-center">
          <Button onClick={changeLang} type="text" className="text-gray-500  ">
            <TranslationOutlined style={{fontSize: '20px'}} />
            </Button>
          <Menu.Item key="/help/">
            {t('help')}
          </Menu.Item>
          {
            userId ? (
              <Menu.Item key="/dashboard">
                {t('dashboard')}
              </Menu.Item>
            ) : (
              <Menu.Item key="/login">
                {t('login')}
              </Menu.Item>
            )
          }
        </Menu>
      </div>
    </div>
  )
}

export default Header;