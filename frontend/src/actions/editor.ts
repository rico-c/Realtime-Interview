import { RUN_CODE, UPDATE_LANG } from "./types";
import { RunCode } from "@/types";
import { runCodeAPI } from "utils/api";
import { encode } from "utils/EnCode";
import { axiosJudge0Instance } from "utils/fetchJudge0";

export const runCode = async ({ source_code, language_id }: RunCode) => {
  const judgeRes = await axiosJudge0Instance.post(
    runCodeAPI + "?wait=true&base64_encoded=true",
    {
      source_code: encode(source_code),
      language_id,
    }
  );
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
  // if (judgeRes.data && judgeRes.data.status && judgeRes.data.status.id >= 2) {
  return judgeRes.data;
  // }
  // else {
  //   return false;
  // }
};

export const updateLang =
  (language_id: number) => async (dispatch: any, getState: any) => {
    dispatch({
      type: UPDATE_LANG,
      payload: {
        language: language_id,
      },
    });
  };
