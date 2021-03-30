const writtenexamModel = require("../models/writtenexam");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("123456789ABCDEFGHIJKLMNPQRSTUVWXYZ", 11);

class WrittenExam {
  constructor() {
    this.create = this.create.bind(this);
  }

  // 创建笔试
  async create(req, res) {
    const params = req.body;
    let roomId = nanoid();
    const exsitId = await writtenexamModel.findOne({
      roomId
    });
    if (!exsitId) {
      res.send({
        code: 1,
        message: "未找到笔试 ID，请稍后重试"
      });
    } else {
      await writtenexamModel.update({ roomId: roomId }, params, err => {
        if (err) {
          return res.send({
            code: 1,
            message: err
          });
        }
        res.send({
          code: 0,
          message: "创建成功"
        });
      });
    }
  }

  // 查询笔试列表
  async getwrittenexams(req, res) {
    const params = req.query;
    const teamId = params.teamId;
    const list = await writtenexamModel
      .where({
        teamId
      })
      .sort({
        time: -1
      });
    res.send({
      code: 0,
      data: list
    });
  }
}

module.exports = new WrittenExam();
