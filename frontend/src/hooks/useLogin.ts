import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


/**
 * description: 处理登录成功后根据redux状态跳转到控制板
 * param {*}
 * return {*}
 */
export const useLoginJump = (roomId: string | void) => {
  const history = useHistory();
  const userId = useSelector<any>((state) => {
    return state?.accout?.userId;
  });

  useEffect(() => {
    if (userId) {
      if (roomId) {
        history.push(`/interview/${roomId}`);
      } else {
        history.push("/dashboard");
      }
    }
  }, [userId, history, roomId]);
};

/**
 * description: 检测登录状态，不合格则跳回登录页
 * param {*}
 * return {*}
 */
export const useDetectLogin = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const user = useSelector<any, any>((state) => {
    return state?.accout;
  });
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      history.push("/login");
    } else {
      // dispatch(setCurrentTeam(user.belongTeams[0]));
    }
  }, [user, userId, history]);
};

export const useUserInfo = () => {
  const accout = useSelector<any, any>((state) => {
    return state?.accout;
  });
  if (accout?.userId) {
    return {
      isLogined: true,
      name: accout.name,
      userId: accout.userId,
    };
  } else {
    return {
      isLogined: false,
      name: accout.name,
      userId: null
    };
  }
};
