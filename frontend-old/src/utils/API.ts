const ENV = process.env.NODE_ENV;

// let remoteIp = "124.70.3.148";
let remoteIp = "https://www.realtimeinterview.work";
let localIp = "http://127.0.0.1";

// backend接口
let APIHostIp;

if (ENV === "production") {
  APIHostIp = remoteIp + '/api';
} else if (ENV === "development") {
  APIHostIp = localIp + ":3001";
}

// 代码websocket同步  port 1234
export const yjsHost = `wss://www.realtimeinterview.work/y`;
// terminal同步 port 4000
export const tsocketHost = `wss://www.realtimeinterview.work`;
// export const tsocketHost = `ws://127.0.0.1:4000`;

// 代码运行docker
export const judgeHost = remoteIp + '/judge';
export const runCodeAPI = `${judgeHost}/submissions`;

// express接口 port 3001
export const APIHost = APIHostIp;

export const loginAPI = `${APIHost}/user/login`;
export const logoutAPI = `${APIHost}/user/logout`;
export const registerAPI = `${APIHost}/user/register`;
export const renameAPI = `${APIHost}/user/rename`;

export const createInterviewAPI = `${APIHost}/interview/create`;
export const deleteInterviewAPI = `${APIHost}/interview/delete`;
export const createRoomidAPI = `${APIHost}/interview/createroomid`;
export const getInterviewsAPI = `${APIHost}/interview/getinterviews`;
export const updateNoteAPI = `${APIHost}/interview/updatenote`;
export const getInterviewAPI = `${APIHost}/interview/getinterview`;
export const endInterviewAPI = `${APIHost}/interview/endinterview`;
export const getWrittenexamsAPI = `${APIHost}/interview/getwrittenexams`;
export const updateAPI = `${APIHost}/interview/update`;

export const createQuestionAPI = `${APIHost}/question/create`;
export const getTeamQuestionsAPI = `${APIHost}/question/getbyteam`;

export const addTeamMemberAPI = `${APIHost}/team/addmember`;
export const removeTeammemberAPI = `${APIHost}/team/removemember`;
export const getTeamInfoAPI = `${APIHost}/team/getteaminfo`;
export const renameTeamAPI = `${APIHost}/team/rename`;
export const createTeamAPI = `${APIHost}/team/createteam`;
export const belongTeamsAPI = `${APIHost}/team/belongteams`;

export const gettokenAPI = `${APIHost}/agora/gettoken`;

export const createopinionAPI = `${APIHost}/opinion/create`;
