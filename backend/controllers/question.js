const QuestionModel = require("../models/question");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("123456789abcdefghijklmnpqrstuvwxyz", 11);

class Question {
  // 创建题目
  async create(req, res) {
    try {
      const {
        // 题目类型
        type,
        //   题目标题
        title,
        //   题目内容,富文本字符串
        content,
        //   选项列表
        options,
        //   编程题代码语言
        language,
        //   编程题初始代码
        initialCode,
        //   编程题测试用例代码
        testCode,
        //   备注
        note,
        //   答案
        answer,
        creator,
        // 问题所属团队
        teamId
      } = req.body;
      console.log(req.body);
      const result = await QuestionModel.create({
        id: nanoid(),
        type,
        title,
        content,
        options,
        language,
        initialCode,
        testCode,
        note,
        answer,
        creator,
        teamId,
        createTime: new Date()
      });
      res.send({
        code: 0,
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }
  // 获取题目
  async getbyteam(req, res) {
    try {
      const {teamId} = req.query;
      const result = await QuestionModel.where({
        teamId
      });
      res.send({
        code: 0,
        data: result
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Question();
