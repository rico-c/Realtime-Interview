import { gettokenAPI } from "../utils/api";
import axios from "axios";

export const getJoiningToken = async (params) => {
  console.log(params);
  const res = await axios.get(gettokenAPI, { params: params });
  return res;
};
