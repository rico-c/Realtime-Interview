const user = require('./user');
const interview = require('./interview');

module.exports =  app => {
  app.use("/interview", interview);
  app.use("/user", user);
};
