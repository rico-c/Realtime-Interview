const app = require("express")();
const cors = require("cors");

app.use(cors({ origin: "http://127.0.0.1:3000" }));

const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.send("Sent a message");
  console.log("用户" + socket.id + "连接");
  socket.on("msg", data => {
    //监听msg事件（这个是自定义的事件）
    console.log(data); //你好服务器
    socket.emit("msg", "你好浏览器");
    //向socket用户发送信息
  });
  socket.on("disconnect", function() {
    console.log("A user disconnected");
  });
});

http.listen(3002, function() {
  console.log("terminal socket listening on 3002");
});
