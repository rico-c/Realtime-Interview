import { CreateQuestion } from "@/types";
import axios from "axios";
import { createQuestionAPI } from "utils/api";

axios.defaults.withCredentials = true;

export const createQuestion = async (params: CreateQuestion) => {
  console.log(params);
  const res = await axios.post(createQuestionAPI, params);
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};
