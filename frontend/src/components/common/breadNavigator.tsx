import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { useHistory } from 'react-router-dom';

interface BreadProps {
  data: any;
  className?: any;
}

const BreadNavigator: FC<BreadProps> = (props) => {
  const history = useHistory();
  const { data } = props;
  const go = (path) => {
    history.push(path);
  }
  return (
    <Breadcrumb>
      {
        data.map(i => {
          return <Breadcrumb.Item key={i.path}>
            <a onClick={() => go(i.path)}>{i.name}</a>
          </Breadcrumb.Item>
        })
      }
    </Breadcrumb>
  )
}

export default BreadNavigator;