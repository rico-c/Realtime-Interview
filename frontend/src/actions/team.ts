import {} from "./types";
import {} from "@/types";
import axios from "axios";
import { getTeamInfoAPI } from "@/utils/API";

export const getTeamInfo = async (teamId: any) => {
  const res = await axios.get(getTeamInfoAPI, {
    params: {
      teamId
    }
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};
