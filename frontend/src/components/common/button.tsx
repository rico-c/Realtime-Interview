import React, { FC, useMemo, useEffect, useState, useCallback, ReactNode } from "react";
import { Button } from 'antd';
import './button.scss';

interface BtnProp {
  color?: string,
  icon?: any,
  backgroundColor?: string,
  onClick?: any
}

const IntButton: FC<BtnProp> = (props) => {
  const { children, color, backgroundColor,icon, onClick } = props;
  return (
    <Button className="int-btn" icon={icon} style={{ color: color, 'borderColor': color, 'backgroundColor': backgroundColor }} onClick={onClick}> { children }</Button >
  )
}
export default IntButton;