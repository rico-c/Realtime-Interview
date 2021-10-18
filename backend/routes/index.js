const user = require('./user');
const interview = require('./interview');
const team = require('./team');
const question = require('./question');
const writtenexam = require("./writtenexam");
const agora = require("./agora");
const opinion = require("./opinion");

module.exports =  app => {
  app.use("/interview", interview);
  app.use("/user", user);
  app.use("/team", team);
  app.use("/writtenexam", writtenexam);
  app.use("/question", question);
  app.use("/agora", agora);
  app.use("/opinion", opinion);
};
