// export const ip = '124.70.3.148';
export const ip = '127.0.0.1';

// 代码websocket同步
export const yjsHost = `ws://${ip}:1234`;
// 代码运行docker
export const judgeHost = `http://${ip}:8090`;
// express接口
export const Host = `http://${ip}:3001`;

export const runCodeAPI = `${judgeHost}/submissions`;
export const loginAPI = `${Host}/user/login`;