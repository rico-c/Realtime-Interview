import React, { useRef, useCallback } from "react";
import { Dropdown, Menu, Button, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "actions";
import { useHistory, useLocation } from "react-router-dom";

import Setting from "assets/imgs/shezhi.svg";
import Group from "assets/imgs/zuzhi.svg";
import Interview from "assets/imgs/interview.svg";
import Logo from "assets/logo/logo.png";
import InsertIMG from "assets/states/paper.png";
import { useUserInfo } from "hooks/useLogin";
import { useTranslation } from "react-i18next";
import "./index.scss";

export const Sider = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useUserInfo();
  const {t, i18n} = useTranslation('common')
  const menuData = useRef([
    {
      name: t('interview'),
      icon: Interview,
      path: "/dashboard/interviewlist",
    },
    {
      name: t('team'),
      icon: Group,
      path: "/dashboard/team",
    },
    {
      name: t('setting'),
      icon: Setting,
      path: "/dashboard/settings",
    },
  ]);

  const jumpRoute = useCallback((e) => {
    history.replace(e.key);
  }, []);

  const handleLogout = () => {
    dispatch(logout() as any);
  };

  const goOpinion = () => {
    history.push("/dashboard/opinion");
  };

  const Usermenu = (
    <Menu onClick={handleLogout}>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div>
        <div className="logo">
          <img src={Logo} alt="" onClick={(_) => history.push("/")} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={jumpRoute}
        >
          {menuData.current.map((i) => (
            <Menu.Item key={i.path} className="menu-item">
              <div className=" flex items-center space-between">
                <img src={i.icon} alt="" className="icon" />
                <b>{i.name}</b>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div>
        <div className="insert-img">
          <Tooltip placement="top" title="反馈意见">
            <img src={InsertIMG} alt="" onClick={goOpinion} />
          </Tooltip>
        </div>
        <Dropdown overlay={Usermenu} className="user-dropdown">
          <Button icon={<UserOutlined />}>
            {user?.name}
            <CaretDownOutlined />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};
