# 技术栈
## 概要
- 前端：React + Typescript
  - 代码编辑器：monaco-editor
  - 编辑器同步：[Yjs](https://github.com/yjs/yjs)
  - 实时音视频：[Agora](https://console.agora.io/)
  
- 后端1：ExpressJs + NodeJs
  - 代码同步服务：Yjs（由package.json > script 启动）端口1234
    - 启动`PORT=1234 node ./node_modules/y-websocket/bin/server.js`（线上使用pm2启动）
  - 接口服务：端口3001

- 后端2：Ruby
  - 远程代码编译：[Judge0部署](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure) 端口8090
    - 启动 (HTTP)
      ```
        cd judge0-v1.12.0
        docker-compose up -d db redis
        sleep 10s
        docker-compose up -d
        sleep 5s
      ```