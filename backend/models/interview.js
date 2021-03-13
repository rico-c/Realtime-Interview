const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  roomId: String,
  // 面试开始时间
  time: Date,
  // 创建时间
  createTime: Date,
  // 实际开始时间
  startTime: Date,
  // 结束时间
  endTime: Date,
  // 面试耗时,N分钟
  spendTime: Number,
  // 创建面试者
  creator: String,
  // 最新编辑者
  updater: String,
  tags: Array,
  // 1:待开始 2:进行中 3:已结束
  status: Number,
  // 面试官信息
  interviewer: String,
  // 候选人信息
  joinerEmail: String,
  joinerName: String,
  // 打分
  score: Number,
  // 团队ID
  teamId: String,
  // 企业ID
  companyId: String,
  // 面试前10分钟提醒
  mailRemind: Boolean,
  // 创建后立即发送邮件通知
  sendMail: Boolean,
  // 1: 预约 2：立即创建
  type: Number,
  //面试评价
  comment: String,
  //面试评分，满分100
  rate: Number,
  // 面试记录
  note: String
});

const Interview = mongoose.model('interviews', interviewSchema);

module.exports = Interview;
