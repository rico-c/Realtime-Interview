const UserModel = require("../models/user");
const { customAlphabet } = require("nanoid");
const TeamController = require("./team");

const nanoid = customAlphabet("123456789abcdefghijklmnpqrstuvwxyz", 8);

class User {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req, res) {
    try {
      const userId = req.session.userId ? String(req.session.userId) : null;
      // 检查session登录状态
      if (req.session.userId) {
        const userInfo = await UserModel.findOne({
          userId,
        });
        if (userInfo) {
          res.send({
            code: 0,
            data: userInfo,
          });
        } else {
          res.send({
            code: 1,
            data: null,
            message: "需要重新登录",
          });
        }
        return;
      }
      // 检查用户名密码
      const { mobile, password, rememberme } = req.query;
      if (!mobile || !password) {
        res.send({
          code: 1,
          data: null,
          message: "缺少账号或密码",
        });
        return;
      }
      const userInfo = await UserModel.findOne({
        mobile: mobile,
        password,
      });
      if (userInfo) {
        if (rememberme === "true") {
          req.session.userId = userInfo.toObject().userId;
        } else if (rememberme === "false") {
          delete req.session;
        } else {
          req.session.userId = userInfo.toObject().userId;
        }

        res.send({
          code: 0,
          data: userInfo,
          message: "登录成功",
        });
      } else {
        res.send({
          code: 1,
          data: null,
          message: "账号或密码错误",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async logout(req, res) {
    try {
      delete req.session.userId;
      res.send({
        code: 0,
        message: "退出成功",
      });
    } catch (err) {
      res.send({
        code: 1,
        message: "退出失败",
      });
    }
  }

  async rename(req, res) {
    try {
      if (!req.session.userId) {
        return res.send({
          code: 1,
          data: "先请登录",
        });
      }
      const sessionUserId = req.session.userId;
      const params = req.body;
      const { userId, name } = params;
      if (sessionUserId !== userId) {
        throw new Error("session与userid不一致");
      }
      await UserModel.updateOne(
        { userId },
        {
          name,
        }
      );
      res.send({
        code: 0,
        message: "退出成功",
      });
    } catch (err) {
      res.send({
        code: 1,
        message: "重命名失败",
      });
    }
  }

  async register(req, res) {
    // 检查用户名密码
    const { mobile, password, name } = req.body;
    if (!mobile || !password || !name) {
      res.send({
        code: 1,
        data: null,
        message: "缺少必填信息",
      });
      return;
    }
    const userInfo = await UserModel.findOne({
      mobile,
    });
    if (userInfo) {
      res.send({
        code: 1,
        data: null,
        message: "该手机号已被注册，可直接登录",
      });
    } else {
      const userId = nanoid();
      const result = await TeamController.create({
        creator: userId,
        manager: [userId],
        users: [userId],
        creator: userId,
        teamName: `${name}的团队`,
      });
      const belongTeams = [
        { teamName: result.teamName, teamId: result.teamId },
      ];
      await UserModel.create(
        {
          mobile,
          password,
          name,
          userId,
          belongTeams,
          createTime: new Date(),
        }
      );
      req.session.userId = userId;
      res.send({
        code: 0,
        data: {
          mobile,
          name,
          userId,
          belongTeams,
        },
        message: "注册成功",
      });
    }
  }
}

module.exports = new User();
