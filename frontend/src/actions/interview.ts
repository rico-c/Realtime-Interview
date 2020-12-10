import { UPDATE_INTERVIEWS } from "./types";
import axios from "axios";
import {
  createInterviewAPI,
  createRoomidAPI,
  getInterviewsAPI
} from "@/utils/API";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

export const createRoomid = async userid => {
  const res = await axios.get(createRoomidAPI, {
    params: {
      userid
    }
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const createInterview = async ({info, id}) => {
  const res = await axios.post(createInterviewAPI, {
    // roomId
    // time
    // createTime
    // creator
    // tags
    // status
    // joinerEmail
    // joinerName
    // score
  });
  if (res.data.code === 0) {
  }
  return res.data;
};

export const fetchInterviews = teamid => async (
  dispatch: any,
  getState: any
) => {
  if (!teamid) {
    return;
  }
  const res = await axios.get(getInterviewsAPI, {
    params: {
      teamid
    }
  });
  if (res.data.code === 0) {
    dispatch({
      type: UPDATE_INTERVIEWS,
      payload: {
        list: res.data.data
      }
    });
  }
  return res.data;
};
