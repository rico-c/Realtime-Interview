import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentTeam } from "actions";

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

/**
 * description: 检测登录状态，不合格则跳回登录页
 * param {*}
 * return {*}
 */
export const useDetectLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector<any, any>((state) => {
    return state?.accout;
  });
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      history.push("/login");
    } else {
      dispatch(currentTeam(user.belongTeams[0]));
    }
  }, [user, userId, history, dispatch]);
};

export const useUserInfo = () => {
  const accout = useSelector<any, any>((state) => {
    return state?.accout;
  });
  if (accout?.userId) {
    return {
      isLogined: true,
      name: accout.name,
    };
  } else {
    return {
      isLogined: false,
    };
  }
};
