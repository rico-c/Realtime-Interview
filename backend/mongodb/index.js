const mongoose = require("mongoose");
const config = require("./config");

const moreConfig = {
  auth: { authSource: "interview" }, //对应要连接数据库
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(config, moreConfig)
  .then(() => console.log("数据库连接成功"))
  .catch(() => console.log("数据库连接失败"));
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error", function(error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("close", function() {
  console.log("数据库断开，重新连接数据库");
  mongoose.connect(url, { server: { auto_reconnect: true } });
});

module.exports = db;
