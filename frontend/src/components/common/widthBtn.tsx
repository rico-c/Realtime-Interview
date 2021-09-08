import React, { ReactNode } from "react";
import { Button } from 'antd';

interface BtnProp extends React.ComponentProps<typeof Button> {
  children?: ReactNode
}

export const WidthButton = (props: BtnProp) => {
  const { children, ...restProps } = props;
  return (
    <Button style={{ width: '100%' }} {...restProps}>{children}</Button >
  )
}