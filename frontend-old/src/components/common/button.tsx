import React, { ReactNode } from "react";
import { Button } from 'antd';
import './button.scss';

interface BtnProp extends React.ComponentProps<typeof Button> {
  color?: string;
  icon?: any;
  backgroundColor?: string;
}

const IntButton = (props: BtnProp) => {
  const { children, color, backgroundColor, icon, ...restProps } = props;
  return (
    <Button className="int-btn" icon={icon} style={{ color: color, 'borderColor': color, 'backgroundColor': backgroundColor }} {...restProps}> {children}</Button >
  )
}
export default IntButton;