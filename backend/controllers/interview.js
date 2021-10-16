const InterviewModel = require("../models/interview");
const UserModel = require("../models/user");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("123456789ABCDEFGHIJKLMNPQRSTUVWXYZ", 10);

class Interview {
  constructor() {
    this.create = this.create.bind(this);
  }

  // 创建房间ID
  async createRoom(req, res) {
    const creator = req.query.userId;
    let roomId = nanoid();
    let exsitId = await InterviewModel.findOne({
      roomId,
    });
    if (exsitId) {
      roomId = nanoid();
      exsitId = await InterviewModel.findOne({
        roomId,
      });
      if (exsitId) {
        res.send({
          code: 1,
          message: "创建唯一ID失败",
        });
      } else {
        await InterviewModel.create({
          roomId,
          creator,
        });
      }
      res.send({
        code: 0,
        data: roomId,
      });
    } else {
      await InterviewModel.create({
        roomId,
        creator,
        createTime: new Date(),
      });
      res.send({
        code: 0,
        data: roomId,
      });
    }
  }

  // 创建预约面试
  async create(req, res) {
    const params = req.body;
    const { roomId } = params;
    const exsitId = await InterviewModel.findOne({
      roomId,
    });
    if (!exsitId) {
      res.send({
        code: 1,
        message: "未找到面试 ID，请稍后重试",
      });
    } else {
      await InterviewModel.update({ roomId: roomId }, params, (err) => {
        if (err) {
          return res.send({
            code: 1,
            message: err,
          });
        }
        res.send({
          code: 0,
          message: "创建成功",
        });
      });
    }
  }

  // 修改面试信息
  async update(req, res) {
    const params = req.body;
    const { joinerName,time,rate,comment, roomId } = params;
    const exsitId = await InterviewModel.findOne({
      roomId,
    });
    if (!exsitId) {
      res.send({
        code: 1,
        message: "未找到面试 ID，请稍后重试",
      });
    } else {
      const updateParams = {};
      if(joinerName) {
        updateParams.joinerName = joinerName;
      }
      if(time) {
        updateParams.time = time;
      }
      if(rate) {
        updateParams.rate = rate;
      }
      if(comment) {
        updateParams.comment = comment;
      }
      await InterviewModel.update({ roomId: roomId }, updateParams, (err) => {
        if (err) {
          return res.send({
            code: 1,
            message: err,
          });
        }
        res.send({
          code: 0,
          message: "修改成功",
        });
      });
    }
  }

  // 删除预约面试
  async delete(req, res) {
    if (!req.session.userId) {
      return res.send({
        code: 1,
        data: "先请登录",
      });
    }
    const params = req.query;
    const { roomId } = params;
    const exsitId = await InterviewModel.deleteOne({
      roomId,
    });
    if (!exsitId) {
      res.send({
        code: 1,
        message: "未找到面试 ID，请稍后重试",
      });
    } else {
      res.send({
        code: 0,
        message: "删除成功",
      });
    }
  }

  // 查询面试列表
  async getinterviews(req, res) {
    if (!req.session.userId) {
      return res.send({
        code: 1,
        data: "先请登录",
      });
    }
    const params = req.query;
    const teamId = params.teamId;
    const list = await InterviewModel.where({
      teamId,
    }).sort({
      time: -1,
    });
    const creatorsIds = Array.from(new Set(list.map((i) => i.creator)));
    const creatorsinfo = await UserModel.find(
      {
        userId: {
          $in: creatorsIds,
        },
      },
      {
        name: 1,
        userId: 1,
      }
    ).sort({
      time: -1,
    });
    res.send({
      code: 0,
      data: { list, creatorsinfo },
    });
  }

  // 查询面试信息
  async getInterview(req, res) {
    const params = req.query;
    const roomId = params.roomId;
    const list = await InterviewModel.where({
      roomId,
    });
    if (list.length) {
      res.send({
        code: 0,
        data: list[0],
      });
    } else {
      return res.send({
        code: 1,
        message: "找不到该面试ID",
      });
    }
  }

  // 更新面试笔记
  async updateNote(req, res) {
    const params = req.body;
    const { roomId, content } = params;
    await InterviewModel.update(
      {
        roomId,
      },
      {
        roomId,
        note: content,
      },
      (err) => {
        if (err) {
          return res.send({
            code: 1,
            message: err,
          });
        }
        res.send({
          code: 0,
          data: "更新成功",
        });
      }
    );
  }

  // 结束面试
  async endInterview(req, res) {
    const params = req.body;
    const { roomId, rate, comment, interviewer } = params;
    await InterviewModel.update(
      {
        roomId,
      },
      {
        roomId,
        rate,
        comment,
        interviewer,
        status: 3,
        endTime: new Date(),
      },
      (err) => {
        if (err) {
          return res.send({
            code: 1,
            message: err,
          });
        }
        res.send({
          code: 0,
          data: "更新成功",
        });
      }
    );
  }
}

module.exports = new Interview();
