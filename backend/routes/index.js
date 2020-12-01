const user = require('./user');
// const editor = require('./editor');

module.exports =  app => {
  // app.use("/editor", editor);
  app.use("/user", user);
};
