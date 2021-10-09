import { UPDATE_INTERVIEWS, UPDATE_WRITTENEXAM } from "./types";
import axios from "axios";
import {
  CreateInterfacrAction,
  UpdateNoteAPIAction,
  endInterviewAction,
} from "@/types";
import {
  createInterviewAPI,
  createRoomidAPI,
  getInterviewsAPI,
  updateNoteAPI,
  endInterviewAPI,
  getWrittenexamsAPI,
  deleteInterviewAPI
} from "@/utils/API";
import moment from "moment";

axios.defaults.withCredentials = true;

export const createRoomid = async (userId: any) => {
  const res = await axios.get(createRoomidAPI, {
    params: {
      userId,
    },
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const updateNote = async (params: UpdateNoteAPIAction) => {
  const res = await axios.post(updateNoteAPI, params);
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};
export const endInterview = async (params: endInterviewAction) => {
  const res = await axios.post(endInterviewAPI, params);
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const createInterview = async ({
  info,
  id,
  creator,
  teamId,
  type,
}: CreateInterfacrAction) => {
  // 预约创建
  if (info) {
    const time = `${info.date.format("YYYY-MM-DD")} ${info.time.format(
      "HH:mm:ss"
    )}`;
    const res = await axios.post(createInterviewAPI, {
      roomId: id,
      teamId: teamId,
      time: time,
      createTime: new Date(),
      updater: creator,
      status: type,
      joinerEmail: info.joinerEmail,
      joinerName: info.joinerName,
      note: info.note,
      mailRemind: info.mailRemind,
      sendMail: info.sendMail,
      type: type,
    });
    return res.data;
  }
  // 立即创建
  else {
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    const res = await axios.post(createInterviewAPI, {
      roomId: id,
      teamId: teamId,
      time: time,
      createTime: new Date(),
      updater: creator,
      status: type,
      type: type,
    });
    return res.data;
  }
};

export const fetchInterviews =
  (teamId: any) => async (dispatch: any, getState: any) => {
    if (!teamId) {
      return;
    }
    const res = await axios.get(getInterviewsAPI, {
      params: {
        teamId,
      },
    });
    if (res.data.code === 0) {
      const dic = {};
      res.data?.data?.creatorsinfo.forEach((i) => {
        dic[i.userId] = i.name;
      });
      const interviewlist = res.data?.data?.list.map((j) => {
        j.name = dic[j.creator];
        return j;
      });
      dispatch({
        type: UPDATE_INTERVIEWS,
        payload: {
          interviewlist,
        },
      });
    }
    return res.data;
  };

export const deleteInterview =
  async (roomId: string) => {
    if (!roomId) {
      return;
    }
    const res = await axios.get(deleteInterviewAPI, {
      params: {
        roomId,
      },
    });
    console.log(res);
  };

export const fetchWrittenexam =
  (teamId: any) => async (dispatch: any, getState: any) => {
    if (!teamId) {
      return;
    }
    const res = await axios.get(getWrittenexamsAPI, {
      params: {
        teamId,
      },
    });
    if (res.data.code === 0) {
      dispatch({
        type: UPDATE_WRITTENEXAM,
        payload: {
          interviewlist: res.data.data,
        },
      });
    }
    return res.data;
  };

// export const updateTeam = (team: any) => async (
//   dispatch: any,
//   getState: any
// ) => {
//   dispatch({
//     type: UPDATE_TEAM,
//     payload: {
//       currentTeam: team
//     }
//   });
// };
