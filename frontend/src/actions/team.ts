import { CURRENT_TEAM } from "./types";
import axios from "axios";
import {
  getTeamInfoAPI,
  addTeamMemberAPI,
  removeTeammemberAPI,
  renameTeamAPI,
  createTeamAPI,
  belongTeamsAPI,
} from "../utils/api";

export const getTeamInfo = async (teamId: string) => {
  const res = await axios.get(getTeamInfoAPI, {
    params: {
      teamId,
    },
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const getBelongTeams = async (userId: string) => {
  const res = await axios.get(belongTeamsAPI, {
    params: {
      userId
    },
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const postAddTeamMember = async ({teamId, mobile}: {teamId: string, mobile: string | number}) => {
  const res = await axios.post(addTeamMemberAPI, {
      teamId,
      mobile
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const postCreateTeam = async ({
  userId,
  teamName,
}: {
  userId: string;
  teamName: string;
}) => {
  const res = await axios.post(createTeamAPI, {
    userId,
    teamName,
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const renameTeam = async ({
  teamId,
  name,
}: {
  teamId: string;
  name: string;
}) => {
  const res = await axios.post(renameTeamAPI, {
    teamId,
    name,
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const postRemovemember = async ({
  teamId,
  userId,
}: {
  teamId: string;
  userId: string;
}) => {
  const res = await axios.post(removeTeammemberAPI, {
    teamId,
    userId
  });
  if (res.data.code === 0) {
    return res.data.data;
  } else {
    return "";
  }
};

export const setCurrentTeam = (payload: string) => async (dispatch: any) => {
  dispatch({
    type: CURRENT_TEAM,
    payload,
  });
};
