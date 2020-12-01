const mongoose = require("mongoose");

const url = "mongodb://124.70.3.148:27017/interview";

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once("open", () => {
  console.log("连接数据库成功");
});

db.on("error", function(error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("close", function() {
  console.log("数据库断开，重新连接数据库");
  mongoose.connect(url, { server: { auto_reconnect: true } });
});

module.exports = db;
