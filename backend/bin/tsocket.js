const app = require("express")();
const cors = require("cors");

app.use(cors({ origin: "http://127.0.0.1:3000" }));

const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
const workspaces = io.of(/^\/\w+$/);
workspaces.on("connection", (socket) => {
  console.log("users");
  console.log(users);
  setTimeout(() => {
    socket.emit("presentusers", users);
  }, 500);

  socket.on("update", (data) => {
    const workspace = socket.nsp;
    // 使用namespace emit可以发送到所有命名空间下的链接
    // 如果使用socket emit则只发送给当前 发送过来的一个链接
    workspace.emit("sync", data);
  });

  socket.on("newuser", (username) => {
    console.log("newuser");
    if (!users.includes(username) && !!username) {
      socket.username = username;
      users.push(username);
      socket.broadcast.emit("userjoined", username);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    if (users.includes(socket.username)) {
      users.splice(users.indexOf(socket.username), 1);
      socket.broadcast.emit("userleft", socket.username);
    }
  });
});

http.listen(3002, function () {
  console.log("socketio listening on 3002");
});
