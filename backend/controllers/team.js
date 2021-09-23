const TeamModel = require("../models/team");
const UserModel = require("../models/user");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("123456789abcdefghijklmnpqrstuvwxyz", 9);

class Team {
  constructor() {
    this.create = this.create.bind(this);
  }

  // 创建团队
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

  // 新增成员
  async addmember(params) {
    try {
      const { teamId, mobile } = params;
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
