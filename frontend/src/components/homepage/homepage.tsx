import React, { FC, useCallback } from "react";
import { Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { createInterview, createRoomid } from "actions";
import Intro from "assets/imgs/homepageIntro.png";
import { useTranslation } from "react-i18next";
import "./homepage.scss";

const HomePage: FC = () => {
  const history = useHistory();
  const { t } = useTranslation("common");

  const jumpDemo = useCallback(async () => {
    const roomid = await createRoomid("trydemo");
    if (!roomid) {
      message.error("创建面试ID失败");
    }
    const res = await createInterview({
      id: roomid,
      creator: "trydemo",
      teamId: "trydemo",
      type: 2,
    });
    if (res.code === 0) {
      history.push({
        pathname: `/interview/${roomid}`,
        state: {
          demo: true,
        },
      });
    } else {
      message.error("创建失败，请稍后再试");
    }
  }, []);

  return (
    <div className="home-page">
      <div className="title text-center">{t("slogan")}</div>
      <div className="main flex justify-center">
        <div className="left text-center">
          <div className="sub-title">{t("slogan2")}</div>
          <div className="sub-title">{t("slogan3")}</div>
          <div className="sub-title">{t("slogan4")}</div>
          <Button className="try my-10" type="primary" onClick={jumpDemo}>
            {t("try-demo")}
          </Button>
        </div>
      </div>
      <div className="right">
        <img src={Intro} alt="realtime-interview" />
      </div>
      <div className="desc">
        <div className="desc-item">
          <i className="iconfont">&#xe61a;</i>
          <div>
            <div className="desc-title">{t("slogan5")}</div>
            <div className="desc-txt">
            {t("slogan6")}
            </div>
          </div>
        </div>
        <div className="desc-item">
          <i className="iconfont">&#xe61b;</i>
          <div>
            <div className="desc-title">{t("slogan7")}</div>
            <div className="desc-txt">
            {t("slogan8")}
            </div>
          </div>
        </div>
        <div className="desc-item">
          <i className="iconfont">&#xe61c;</i>
          <div>
            <div className="desc-title">{t("slogan9")}</div>
            <div className="desc-txt">{t("slogan10")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
