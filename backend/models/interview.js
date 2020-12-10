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
    // 最新编辑者
    updater: String,
    tags: Array,
    // 1:待开始 2:进行中 3:已结束
    status: Number,
    // 参加面试者
    joinerEmail: String,
    joinerName: String,
    // 打分
    score: Number,
    companyId: String,
    // 团队ID
    teamId: String,
    // 企业ID
    note: String,
    // 面试前10分钟提醒
    mailRemind: Boolean,
    // 创建后立即发送邮件通知
    sendMail: Boolean,
    // 1: 预约 2：立即创建
    type:  Number
});

const Interview = mongoose.model("interviews", interviewSchema);

module.exports = Interview;