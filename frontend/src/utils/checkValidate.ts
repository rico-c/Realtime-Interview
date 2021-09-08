export const checkLogin = ({
  mobile,
  password,
}: {
  mobile: number | string;
  password: string | number;
}): {
  state: boolean;
  msg?: string;
} => {
  if (!mobile) {
    return {
      state: false,
      msg: "请输入手机号码",
    };
  }
  if (!password) {
    return {
      state: false,
      msg: "请输入密码",
    };
  }
  return {
    state: true,
  };
};
