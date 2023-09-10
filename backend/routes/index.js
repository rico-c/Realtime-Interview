const path = require('path')
const user = require('./user');
const interview = require('./interview');
const team = require('./team');
const question = require('./question');
const writtenexam = require("./writtenexam");
const agora = require("./agora");
const opinion = require("./opinion");

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Realtime Interview Backend API',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, '../controllers/*.js')], // 指定包含Swagger注释的API路由文件
};

const specs = swaggerJsdoc(options);

module.exports =  app => {
  app.use("/interview", interview);
  app.use("/user", user);
  app.use("/team", team);
  app.use("/writtenexam", writtenexam);
  app.use("/question", question);
  app.use("/agora", agora);
  app.use("/opinion", opinion);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
