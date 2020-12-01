class User {
  constructor() {
    this.login = this.login.bind(this);
  }
  async login(req, res) {
    if (req.session.name) {
        res.send(`欢迎回来${req.session.name}`);
        return;
    }
    // 使用查询字符串当作保存的信息
    req.session.name = req.query.name;
    req.session.pwd = req.query.pwd;

    res.send(`欢迎登录${req.session.name}`);
  }
}

module.exports = new User();
