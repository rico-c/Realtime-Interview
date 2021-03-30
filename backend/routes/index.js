const user = require('./user');
const interview = require('./interview');
const team = require('./team');
const writtenexam = require("./writtenexam");

module.exports =  app => {
  app.use("/interview", interview);
  app.use("/user", user);
  app.use("/team", team);
  app.use("/writtenexam", writtenexam);
};
