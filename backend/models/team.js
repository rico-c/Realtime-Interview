const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  // 成员
  /**
   * {
   *    username: string,
   *    name: string
   * }
   */
  users: Array,
  // 团队名
  teamName: String,
  // 团队id
  teamId: String,
  // 公司名
  company: String,
  // 公司id
  companyId: String,
  // 管理员
  manager: Array,
  // 管理员userid
  creator: String,
  // 创建时间
  createTime: Date
});

const Team = mongoose.model("teams", teamSchema);

module.exports = Team;
