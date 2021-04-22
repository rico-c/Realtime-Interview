const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  // 题目id
  id: String,
  // 题目类型 1:判断题 2:单选题 3:多选题 4:问答题 5:编程题
  type: Number,
  //   题目标题
  title: String,
  //   题目内容,富文本字符串
  content: String,
  //   选项列表
  options: Array,
  //   编程题代码语言
  language: Number,
  //   编程题初始代码
  initialCode: String,
  //   编程题答案代码
  answerCode: String,
  //   编程题测试用例代码
  testCode: String,
  //   备注
  note: String,
  //   答案
  answer: String,
  //   标签
  tags: Array,
  // 所属团队
  teamId: String,
  // 开源
  opensoure: Boolean,
  creator: String,
  createTime: Date
});

const Question = mongoose.model("questions", questionSchema);

module.exports = Question;
