import {useEffect} from 'react';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * description: 处理登录成功后根据redux状态跳转到控制板
 * param {*}
 * return {*}
 */
export const useLoginJump = () => {
  const history = useHistory();
  const userId = useSelector<any>((state) => {
    return state?.accout?.userId;
  });

  useEffect(() => {
    if (userId) {
      history.push("/dashboard");
    }
  }, [userId, history]);
};

export const useUserInfo = () => {
  const accout = useSelector<any, any>((state) => {
    return state?.accout;
  });
  if(accout?.userId) {
    return {
      isLogined: true,
      name: accout.name
    };
  }
  else {
    return {
      isLogined: false
    };
  }
};