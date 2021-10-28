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
- 防火墙： 只开放 80、443、22端口，其余端口都通过nginx转发
- Mongodb
  - 安装： 
    - https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-red-hat/
    - https://jasonkayzk.github.io/2021/03/10/CentOS7%E5%AE%89%E8%A3%85MongoDB/
  - 数据迁移
    
- Nginx安装配置: https://juejin.cn/post/6844904134345228301
- Nginx配置模块
```
1.进入到解压后的源码包，如：
cd /usr/local/nginx-1.14.1/
编译
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-http_v2_module
3. make：
make
千万不要执行make install，否则就覆盖安装了。
4. 备份原有的nginx，如：
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx_bak
然后将刚刚编译好的nginx覆盖掉原有的nginx（nginx需要停止）
cp ./objs/nginx /usr/local/nginx/sbin/
查看安装情况，如图所示即安装ssl模块成功：
/usr/local/nginx/sbin/nginx -V
```

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

## 其他注意事项
- Monaco Editor的webpack plugin和monaco版本有要求的对应关系，需要匹配。同时注意Nginx的路由匹配不要遮挡到资源请求。