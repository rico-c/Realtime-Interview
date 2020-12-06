const InterviewModel = require("../models/interview");
const dayjs = require('dayjs');
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

class Interview {
  constructor() {
    this.create = this.create.bind(this);
  }

  // 创建房间ID
  async createRoom(req, res) {
    const creator = req.query.userid;
    let roomId = nanoid();
    let exsitId = await InterviewModel.findOne({ roomId });
    if (exsitId) {
      roomId = nanoid();
      exsitId = await InterviewModel.findOne({ roomId });
      if (exsitId) {
        res.send({
          code: 1,
          message: "创建唯一ID失败"
        });
      } else {
        await InterviewModel.create({ roomId, creator });
      }
      res.send({
        code: 0,
        data: roomId
      });
    } else {
      await InterviewModel.create({ roomId, creator, createTime: new Date() });
      res.send({
        code: 0,
        data: roomId
      });
    }
  }

  // 创建预约面试
  async create(req, res) {
    const params = req.body;
    const { roomId } = params;
    const exsitId = await InterviewModel.findOne({ roomId });
    console.log(exsitId);
    if (!exsitId) {
      await InterviewModel.create(params);
    }

    res.send({
      code: 0,
      message: "创建面试成功"
    });
  }

  // 查询面试列表
  async get(req, res) {
    const params = req.query;
    const teamid = params.teamid;
    const list = await InterviewModel.where({ teamid });
    res.send({
      code: 0,
      data: list
    }); 
  }
}

module.exports = new Interview();
