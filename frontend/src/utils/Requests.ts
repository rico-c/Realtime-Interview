import axios from "axios";
import { runCodeAPI } from "./api";
import { axiosJudge0Instance } from "./fetchJudge0";

// @ts-ignore
export const runCodeToken = async ({ source_code, language_id }) => {
  try {
    const tokenRes = await axiosJudge0Instance.post(runCodeAPI, {
      source_code,
      language_id
    });
    const token = tokenRes.data.token;
    const interval = setInterval(async() => {
      const res = await axiosJudge0Instance.get(runCodeAPI + "/" + token, {
        params: {
          fields: "*"
        }
      });
      // @ts-ignore
      if (res.status === 200 && res.data.status_id >= 2) {
        clearInterval(interval);
        console.log(res.data.stdout);
      }
    }, 1000)
  } catch (err) {
    throw err;
  }
};
