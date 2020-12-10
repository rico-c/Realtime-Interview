const UserModel = require("../models/user");

class User {
    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async login(req, res) {
        const userId = req.session.userId ? String(req.session.userId) : null;
        // 检查session登录状态
        if (req.session.userId) {
            const userInfo = await UserModel.findOne({
                userId
            });
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
        const {
            mobile,
            password
        } = req.query;
        if (!mobile || !password) {
            res.send({
                code: 1,
                data: null,
                message: "缺少账号或密码"
            });
            return;
        }
        const userInfo = await UserModel.findOne({
            mobile,
            password
        });
        if (userInfo) {
            req.session.userId = userInfo.toObject().userId;
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
            delete req.session.userId;
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