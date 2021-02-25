# 技术栈
## 概要
- 前端：React + Typescript
  - 代码编辑器：monaco-editor
  - 编辑器同步：[Yjs](https://github.com/yjs/yjs)
  - 实时音视频：[Agora](https://console.agora.io/)
  - 注意：开发时使用 http://127.0.0.1:3000 ，以避免跨域问题
  
- 后端1：ExpressJs + NodeJs
  - 代码同步服务：Yjs（由package.json > script 启动）
  - 端口：1234
    - 启动`PORT=1234 node ./node_modules/y-websocket/bin/server.js`（线上使用pm2启动）
  - 接口服务：端口3001

- 后端2：Ruby（暂时由华为云服务器运行）
  - 远程代码编译：[Judge0部署](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure) 
  - 端口：8090
    - 启动 (HTTP)
      ```
        cd judge0-v1.12.0
        docker-compose up -d db redis
        sleep 10s
        docker-compose up -d
        sleep 5s
      ```

- 后端3： socket.io
  - 端口: 3002
  - 启动： `npm run tsocket`
  - 功能： 用于将Yjs运行结果同步至所有面试间内的其他人