import axios from "axios";
import { createopinionAPI } from "utils/api";
import { message } from "antd";
axios.defaults.withCredentials = true;

export const createOpinion = async (params: {
  userId: string;
  opinion: string;
  time: Date;
}) => {
  const res = await axios.post(createopinionAPI, params);
  if (res.data.code === 0) {
    message.success('提交成功')
    return res.data.data;
  }
  message.warning("提交失败");
};
