const isProduction = process.env.NODE_ENV === "production";

const backendHost = "realtime-interview.up.railway.app";
const backendURI = `https://${backendHost}`;
const APIHostURI = isProduction ? backendURI + "/api" : 'http://127.0.0.1:3003/api';
// 代码websocket同步  port 1234
export const yjsHost = isProduction ? `ws://${backendHost}/y` : `ws://127.0.0.1:3003/y`;
// terminal同步 port 4000
export const tsocketHost = isProduction ? `ws://${backendHost}` : `ws://127.0.0.1:3003`;

export const judgeHost = "https://judge0-ce.p.rapidapi.com";

// 代码运行docker
export const runCodeAPI = `/submissions`;

// express接口 port 3001
export const APIHost = APIHostURI;

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
