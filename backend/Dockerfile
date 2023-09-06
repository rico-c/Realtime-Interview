# 使用Alpine Linux作为基础镜像
FROM alpine:latest

# 安装Node.js和npm
RUN apk add --update nodejs npm

# 安装Nginx
RUN apk update && apk add nginx

# 设置工作目录
WORKDIR /app/

COPY package.json ./

# 安装项目依赖项
RUN npm install

# 复制Nginx配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 复制你的后端代码到容器中
COPY . .

# 开放Nginx监听端口（通常为80）
EXPOSE 80

# 启动一个脚本，该脚本内部启动三个npm脚本
CMD ["sh", "-c", "cd /app/ & npm install & npm run serve & npm run tsocket & npm run ysocket & nginx -g 'daemon off;'"]
