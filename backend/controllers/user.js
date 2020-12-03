const UserModel = require("../models/user");

class User {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req, res) {
    const userid = req.session.userid;
    // 检查session登录状态
    console.log('req session:' + req.session.userid);
    if (req.session.userid) {
      const userInfo = await UserModel.findOne({ userid });
      if (userInfo) {
        res.send({
          code: 0,
          data: userInfo
        });
      } else {
        res.send({
          code: 1,
          data: null,
          message: "需要重新登录"
        });
      }
      return;
    }
    // 检查用户名密码
    const { mobile, password } = req.query;
    if (!mobile || !password) {
      res.send({
        code: 1,
        data: null,
        message: "缺少账号或密码"
      });
      return;
    }
    const userInfo = await UserModel.findOne({ mobile, password });
    if (userInfo) {
      console.log('success:' + userInfo.toObject().userid);
      req.session.userid = userInfo.toObject().userid;
      res.send({
        code: 0,
        data: userInfo,
        message: '登录成功'
      });
    } else {
      res.send({
        code: 1,
        data: null,
        message: "账号或密码错误"
      });
    }
  }

  async logout(req, res) {
    try {
      delete req.session.userid;
      res.send({
        code: 0,
        message: "退出成功"
      });
    } catch (err) {
      res.send({
        code: 1,
        message: "退出失败"
      });
    }
  }
}

module.exports = new User();
