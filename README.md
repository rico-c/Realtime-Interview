# 技术栈
## 概要
- 前端：React + Typescript
  - 代码编辑器：monaco-editor
  - 编辑器同步：[Yjs](https://github.com/yjs/yjs)
  - 实时音视频：[Agora](https://console.agora.io/)
  - 注意：开发时使用 http://127.0.0.1:3000 ，以避免跨域问题
  
- 后端1：ExpressJs + NodeJs
  - 代码同步服务：Yjs（由package.json > script 启动） 编辑器代码同步
  - 启动
    - 线上：启动`pm2 start ***/node_modules/y-websocket/bin/server.js`（线上使用pm2启动）
    - 开发：`npm run serve`
  - 接口服务：端口3001

- 后端2：Judge0第三方库（暂时由华为云服务器运行）
  - 远程代码编译：[Judge0部署](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure) 
  - 端口：2358
    - 启动 (HTTP)
      ```
        cd judge0-v1.12.0
        docker-compose up -d db redis
        sleep 10s
        docker-compose up -d
        sleep 5s
      ```

- 后端3： socket.io   ternimal同步
  - 端口: 3002
  - 启动： `npm run tsocket`
  - 功能： 用于将Yjs运行结果同步至所有面试间内的其他人


## 运维
- Mongodb
- Nginx配置: https://juejin.cn/post/6844904134345228301
```
    server {                    
        listen 443 ssl;
        server_name www.realtimeinterview.work;
        ssl_certificate 1_www.realtimeinterview.work_bundle.crt;
        ssl_certificate_key 2_www.realtimeinterview.work.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location /y/ {
            proxy_pass http://127.0.0.1:1234/;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }

        location /t {
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host;
             proxy_pass http://127.0.0.1:4000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
        }

        location /socket.io {
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $host;
             proxy_pass http://127.0.0.1:4000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
        }

        location /api/ {
             proxy_pass http://127.0.0.1:3001/;
        }
        
        location /judge/ {
             proxy_pass http://127.0.0.1:8090/;
        }

        location /db/ {
             proxy_pass http://127.0.0.1:27017/;
        }

        location / {
            root   /var/www/REALTIME-INTERVIEW/frontend/build;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

    }

```