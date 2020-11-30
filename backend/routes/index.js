var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    if (req.session.name) {
        res.send(`欢迎回来${req.session.name}`);
        return;
    }
    // 使用查询字符串当作保存的信息
    req.session.name = req.query.name;
    req.session.pwd = req.query.pwd;

    res.send(`欢迎登录${req.session.name}`);
});

module.exports = router;
