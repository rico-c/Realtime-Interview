const OpinionModel = require("../models/opinion");

class Opinion {
  async create(req, res) {
    try {
      const {
        userId,
        opinion,
        time
      } = req.body;
      const result = await OpinionModel.create({
        userId,
        opinion,
        time,
      });
      res.send({
        code: 0,
        data: result,
      });
    } catch (err) {
      res.send({
        code: 1,
        data: '创建失败',
      });
    }
  }
}

module.exports = new Opinion();
