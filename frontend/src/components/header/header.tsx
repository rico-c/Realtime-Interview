import React, { FC } from "react";
import PropTypes from "prop-types";
import Icon from "@/assets/imgs/icon.svg";
import "./header.scss";

const Header: FC = () => {
  return (
    <div className="header">
      <div className="icon">
        <span className="logo-icon">
          <img src={Icon} />
        </span>
        <span className="logo-txt">Realtime Interview</span>
      </div>
    </div>
  )
}

export default Header;