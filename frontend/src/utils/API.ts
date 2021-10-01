const ENV = process.env.NODE_ENV;

let remoteIp = "124.70.3.148";
let localIp = "127.0.0.1";

// backend接口
let APIHostIp;
// runcode接口
let judge0HostIp;
// codeeditor多人同步接口
let yjsHostIp;
// terminal及用户等socket同步接口
let tsocketHostIp;

if (ENV === "production") {
  judge0HostIp = remoteIp;
  yjsHostIp = remoteIp;
  APIHostIp = remoteIp;
  tsocketHostIp = remoteIp;
} else if (ENV === "development") {
  judge0HostIp = remoteIp;
  yjsHostIp = remoteIp;
  APIHostIp = localIp;
  tsocketHostIp = localIp;
}

// 代码websocket同步
export const yjsHost = `ws://${yjsHostIp}:1234`;
export const tsocketHost = `ws://${tsocketHostIp}:3002`;

// 代码运行docker
export const judgeHost = `http://${judge0HostIp}:8090`;
export const runCodeAPI = `${judgeHost}/submissions`;

// express接口
export const APIHost = `http://${APIHostIp}:3001`;

export const loginAPI = `${APIHost}/user/login`;
export const logoutAPI = `${APIHost}/user/logout`;
export const registerAPI = `${APIHost}/user/register`;

export const createInterviewAPI = `${APIHost}/interview/create`;
export const createRoomidAPI = `${APIHost}/interview/createroomid`;
export const getInterviewsAPI = `${APIHost}/interview/getinterviews`;
export const updateNoteAPI = `${APIHost}/interview/updatenote`;
export const getInterviewAPI = `${APIHost}/interview/getinterview`;
export const endInterviewAPI = `${APIHost}/interview/endinterview`;
export const getWrittenexamsAPI = `${APIHost}/interview/getwrittenexams`;

export const createQuestionAPI = `${APIHost}/question/create`;
export const getTeamQuestionsAPI = `${APIHost}/question/getbyteam`;

export const addTeamMemberAPI = `${APIHost}/team/addmember`;
export const removeTeammemberAPI = `${APIHost}/team/removemember`;
export const getTeamInfoAPI = `${APIHost}/team/getteaminfo`;
export const renameTeamAPI = `${APIHost}/team/rename`;
export const createTeamAPI = `${APIHost}/team/createteam`;
export const belongTeamsAPI = `${APIHost}/team/belongteams`;
