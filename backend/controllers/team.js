const TeamModel = require("../models/team");
const UserModel = require("../models/user");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("123456789abcdefghijklmnpqrstuvwxyz", 9);

class Team {
  constructor() {
    this.create = this.create.bind(this);
  }

  // 创建团队内部方法
  async create(params) {
    try {
      const { users, teamName, company, companyId, manager, creator } = params;
      const res = await TeamModel.create({
        users,
        teamName,
        teamId: nanoid(),
        company,
        companyId,
        manager,
        creator,
        createTime: new Date(),
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async createteam(req, res) {
    const { userId, teamName } = req.body;
    await TeamModel.create({
      users: [userId],
      teamId: nanoid(),
      teamName,
      manager: userId,
      creator: userId,
      createTime: new Date(),
    });
    res.send({
      code: 0,
      data: '创建成功'
    });
  }

  async belongteams(req, res) {
    try {
      const { userId } = req.query;
      const teamresult = await TeamModel.find({
        users: {
          $elemMatch: { $eq: userId },
        },
      });
      res.send({
        code: 0,
        data: teamresult,
      });
    } catch(err) {
      console.error(err);
    }
  }

  // 新增成员
  async addmember(req, res) {
    try {
      const { teamId, mobile } = req.body;
      const teamresult = await TeamModel.findOne({
        teamId,
      });
      const userresult = await UserModel.findOne({
        mobile,
      });
      if (!teamresult) {
        res.send({
          code: 1,
          data: null,
          message: "找不到该用户",
        });
      } else if (!userresult) {
        res.send({
          code: 1,
          data: null,
          message: "找不到该团队",
        });
      } else {
        const users = teamresult.users;
        const userId = userresult.userId;
        if (!users.includes(userId)) {
          await TeamModel.update(
            { teamId: teamId },
            { $push: { users: userId } }
          );
        }
        res.send({
          code: 0,
          data: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 新增成员
  async addmember(req, res) {
    try {
      const { teamId, mobile } = req.body;
      const teamresult = await TeamModel.findOne({
        teamId,
      });
      const userresult = await UserModel.findOne({
        mobile,
      });
      if (!teamresult) {
        res.send({
          code: 1,
          data: null,
          message: "找不到该用户",
        });
      } else if (!userresult) {
        res.send({
          code: 1,
          data: null,
          message: "找不到该团队",
        });
      } else {
        const users = teamresult.users;
        const userId = userresult.userId;
        if (!users.includes(userId)) {
          await TeamModel.update(
            { teamId: teamId },
            { $push: { users: userId } }
          );
        }
        res.send({
          code: 0,
          data: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 修改团队名字
  async rename(req, res) {
    try {
      const { teamId, name } = req.body;
      if (!teamId || !name) {
        return res.send({
          code: 1,
          data: null,
          message: "找不到该用户",
        });
      } else {
        await TeamModel.update(
          {
            teamId,
          },
          {
            teamName: name,
          }
        );
        res.send({
          code: 0,
          data: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 删除成员
  async removemember(req, res) {
    try {
      const { teamId, userId } = req.body;
      const teamresult = await TeamModel.findOne({
        teamId,
      });
      if (!teamresult || !teamresult.users.includes(userId)) {
        res.send({
          code: 1,
          data: null,
          message: "找不到该用户",
        });
      } else {
        await TeamModel.update(
          { teamId: teamId },
          { $pull: { users: userId } }
        );
        res.send({
          code: 0,
          data: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 获取团队信息
  async getteaminfo(req, res) {
    try {
      const { teamId } = req.query;
      const result = await TeamModel.findOne({
        teamId,
      });
      if (result) {
        const users = result.users;
        const usersDetail = await UserModel.where("userId")
          .in(users)
          .select("name userId mobile");
        res.send({
          code: 0,
          data: { info: result, list: usersDetail },
        });
      } else {
        res.send({
          code: 1,
          data: null,
          message: "找不到该团队",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Team();
