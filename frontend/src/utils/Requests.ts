import axios from "axios";

import { runCodeAPI } from "./API";
// @ts-ignore
export const runCodeToken = async ({ source_code, language_id }) => {
  try {
    const tokenRes = await axios.post(runCodeAPI, {
      source_code,
      language_id
    });
    const token = tokenRes.data.token;
    const interval = setInterval(async() => {
      const res = await axios.get(runCodeAPI + "/" + token, {
        params: {
          fields: '*'
        }
      });
      // @ts-ignore
      if (res.status === 200 && res.data.status_id === 3) {
        clearInterval(interval);
      }
    }, 1000)
  } catch (err) {
    throw err;
  }
};
