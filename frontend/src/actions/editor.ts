import { RUN_CODE } from "./types";
import { RunCode } from "@/types";
import axios from "axios";
import { runCodeAPI } from "@/utils/API";

export const runCode = ({ source_code, language_id }: RunCode) => async (
  dispatch: any,
  getState: any
) => {
  axios.defaults.withCredentials = false;
  const judgeRes = await axios.post(runCodeAPI + "?wait=true", {
    source_code,
    language_id
  });
  // const token = judgeRes.data.token;
  // const interval = setInterval(async () => {
  //   const res = await axios.get(runCodeAPI + "/" + token, {
  //     params: {
  //       fields: "stdout,stderr,status_id"
  //     }
  //   });
  //   // @ts-ignore
  //   if (res.status === 200 && res.data.status_id >= 2) {
  //     clearInterval(interval);
  //     dispatch({
  //       type: RUN_CODE,
  //       payload: res.data
  //     });
  //   }
  // }, 1000);
  if (judgeRes.data && judgeRes.data.status && judgeRes.data.status.id >= 2) {
    return judgeRes.data.stdout;
  }
  else {
    return false;
  }
};
