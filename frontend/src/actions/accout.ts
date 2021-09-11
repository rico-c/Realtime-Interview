import { UPDATE_USER, DELETE_USER } from "./types";
import { LoginRes } from "@/types";
import axios from "axios";
import { loginAPI, logoutAPI, registerAPI } from "@/utils/API";

axios.defaults.withCredentials = true;

export const login =
  ({
    mobile = null,
    password = null,
    rememberme = true,
  }: {
    mobile: number | string;
    password: string | number;
    rememberme: boolean;
  }) =>
  async (dispatch) => {
    const res: LoginRes = await axios.get(loginAPI, {
      params: {
        mobile,
        password,
        rememberme,
      },
    });
    if (res.data.code === 0) {
      const payload = res.data.data;
      dispatch({
        type: UPDATE_USER,
        payload,
      });
    } else {
      dispatch({
        type: DELETE_USER
      });
    }
    return res.data;
  };

export const register =
  ({ mobile = null, password = null, name = null }: any) =>
  async (dispatch: any) => {
    const res: LoginRes = await axios.post(registerAPI, {
      mobile,
      password,
      name,
    });
    if (res.data.code === 0) {
      const payload = res.data.data;
      dispatch({
        type: UPDATE_USER,
        payload,
      });
    } else {
      dispatch({
        type: UPDATE_USER,
        payload: {},
      });
    }
    return res.data;
  };

export const logout = () => async (dispatch: any) => {
  const res: LoginRes = await axios.get(logoutAPI);
  if (res.data.code === 0) {
    dispatch({
      type: DELETE_USER,
      payload: {},
    });
  }
  return res.data;
};

export const tempuser = (name: string) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_USER,
    payload: {
      name,
    },
  });
};


