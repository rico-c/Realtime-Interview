export const checkLogin = ({
  mobile,
  password,
  checkLogin,
}: {
  mobile: number | string;
  password: string;
  checkLogin: boolean
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

export const checkRegister = ({
  name,
  mobile,
  password,
  repeatpassword,
  readProtocol,
}: {
  name: string;
  mobile: number | string;
  password: string;
  repeatpassword: string;
  readProtocol: boolean
}): {
  state: boolean;
  msg?: string;
} => {
  if (!name) {
    return {
      state: false,
      msg: "请输入您的名字",
    };
  }
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
  if (password.length < 6) {
    return {
      state: false,
      msg: "密码长度必须大于6",
    };
  }
  if (password !== repeatpassword) {
    return {
      state: false,
      msg: "两次密码不一致",
    };
  }
  if (!readProtocol) {
    return {
      state: false,
      msg: "请确认阅读协议",
    };
  }
  return {
    state: true,
  };
};
