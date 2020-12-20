const app = require("express")();
const cors = require("cors");

app.use(cors({ origin: "http://127.0.0.1:3000" }));

const http = require("http").Server(app);
const io = require("socket.io")(http);

const workspaces = io.of(/^\/\w+$/)
workspaces.on("connection", socket => {
  socket.on("update", data => {
    const workspace = socket.nsp;
    // 使用namespace emit可以发送到所有命名空间下的链接
    // 如果使用socket emit则只发送给当前 发送过来的一个链接
    workspace.emit("sync", data);
  });
});

http.listen(3002, function() {
  console.log("socketio listening on 3002");
});
