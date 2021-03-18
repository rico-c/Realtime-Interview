export const remoteIp = '124.70.3.148';
export const ip = '127.0.0.1';

// 代码websocket同步
export const yjsHost = `ws://${remoteIp}:1234`;
// 代码运行docker
export const judgeHost = `http://${remoteIp}:8090`;
// express接口
export const Host = `http://${ip}:3001`;

export const runCodeAPI = `${judgeHost}/submissions`;
export const loginAPI = `${Host}/user/login`;
export const logoutAPI = `${Host}/user/logout`;
export const registerAPI = `${Host}/user/register`;
export const createInterviewAPI = `${Host}/interview/create`;
export const createRoomidAPI = `${Host}/interview/createroomid`;
export const getInterviewsAPI = `${Host}/interview/get`;
export const updateNoteAPI = `${Host}/interview/updatenote`;
export const getInterviewAPI = `${Host}/interview/getinterview`;
export const endInterviewAPI = `${Host}/interview/endinterview`;