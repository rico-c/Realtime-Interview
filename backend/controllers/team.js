const TeamModel = require("../models/team");
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
        createTime: new Date()
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Team();
