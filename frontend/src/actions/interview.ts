import { UPDATE_INTERVIEWS, UPDATE_TEAM } from "./types";
import axios from "axios";
import {
    createInterviewAPI,
    createRoomidAPI,
    getInterviewsAPI
} from "@/utils/API";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

export const createRoomid = async userId => {
    const res = await axios.get(createRoomidAPI, {
        params: {
            userId
        }
    });
    if (res.data.code === 0) {
        return res.data.data;
    } else {
        return "";
    }
};

export const createInterview = async ({ info, id, creator, teamId }) => {
    const time = `${info.date.format('YYYY-MM-DD')} ${info.time.format('HH:mm:ss')}`;
    const res = await axios.post(createInterviewAPI, {
        roomId: id,
        teamId: teamId,
        time: time,
        createTime: new Date(),
        updater: creator,
        status: 1,
        joinerEmail: info.joinerEmail,
        joinerName: info.joinerName,
        note: info.note,
        mailRemind: info.mailRemind,
        sendMail: info.sendMail,
        type: 1
    });
    return res.data;
};

export const fetchInterviews = teamId => async (
    dispatch: any,
    getState: any
) => {
    if (!teamId) {
        return;
    }
    const res = await axios.get(getInterviewsAPI, {
        params: {
            teamId
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

export const updateTeam = (team) => async (dispatch: any, getState: any) => {
    dispatch({
        type: UPDATE_TEAM,
        payload: {
            currentTeam: team
        }
    });
}
