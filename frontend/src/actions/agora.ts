import { gettokenAPI } from "utils/api";
import axios from "axios";

export const getJoiningToken = async (params) => {
  const res = await axios.get(gettokenAPI, { params: params });
  return res;
};
