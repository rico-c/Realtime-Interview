import { UPDATE_USER, DELETE_USER } from "./types";
import { LoginRes } from "@/types";
import axios from "axios";
import { loginAPI, logoutAPI } from "@/utils/API";

axios.defaults.withCredentials = true;

export const login = ({mobile = null, password = null}: any) => async(dispatch: any, getState:any) => {
  const res: LoginRes = await axios.get(loginAPI, {
    params: {
      mobile,
      password
    }
  });
  if(res.data.code === 0) {
    const payload = res.data.data;
    dispatch({
      type: UPDATE_USER,
      payload
    });
  }
  return res.data;
}

export const logout = () => async(dispatch: any, getState:any) => {
  const res: LoginRes = await axios.get(logoutAPI);
  if(res.data.code === 0) {
    dispatch({
      type: DELETE_USER,
      payload: {
        accout: {}
      }
    });
  }
  return res.data;
}