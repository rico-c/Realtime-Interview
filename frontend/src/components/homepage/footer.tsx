import "./footer.scss";
import React from "react";
import languageList from "utils/Languages";
import Icon from "assets/logo/logo-white.png";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");
  
  return (
    <div className="footer">
      <div className="w-1/2 mb-5">
        <img src={Icon} width="250" style={{transform: 'translateX(-20px)'}}/>
      </div>
      <div className="w-1/2 pb-2 border-b border-gray">
        <div className="font-bold text-lg pb-2 text-white">{t('support-lang')}</div>
        <div className="flex flex-wrap gap-1">
          {languageList.map((lang) => (
            <div className="mr-5 text-sm text-grey">{lang.name}</div>
          ))}
        </div>
      </div>
      <div className="w-1/2 py-2 border-b border-gray">
        <div className="font-bold text-lg pb-2 text-white">{t('contact')}</div>
        ricardocao.biker@gmail.com
      </div>
      <div className="w-1/2 py-2 text-sm">
        COPYRIGHT © 2019-2023 {t('company')}
      </div>
    </div>
  );
};
