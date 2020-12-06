const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  roomId: String,
  // 面试开始时间
  time: Date,
  // 创建时间
  createTime: Date,
  // 创建面试者
  creator: String,
  tags: Array,
  // 1:待开始 2:进行中 3:已结束
  status: Number,
  // 参加面试者
  joinerEmail: String,
  joinerName: String,
  // 打分
  score: Number,
  company: String,
  team: String,
});

const Interview = mongoose.model("interviews", interviewSchema);

module.exports = Interview;
