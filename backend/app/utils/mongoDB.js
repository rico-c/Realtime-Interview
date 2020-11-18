const mongoose = require('mongoose');

const mongoAddress = {
    host: '120.53.124.72',
    port: '27017',
    dbName: '',
    user: '',
    pass: ''
}

const config = {
    poolSize: 5, // 连接池中维护的连接数
    keepAlive: 120
}

const getMongoUrl = () => {
    let mongoUrl = 'mongodb://';
    mongoUrl += `${mongoAddress.host}:${mongoAddress.port}`;
    mongoUrl += `/${mongoAddress.dbName}`;
    return mongoUrl;
};

let mongoClient = mongoose.createConnection(getMongoUrl(), config);

mongoClient.on('connected', function () {
    console.log(new Date().getTime());
    console.log('Mongoose连接成功');
});

mongoClient.on('error', function (err) {
    console.log('Mongoose 连接失败，原因: ' + err);
});

mongoClient.on('disconnected', function () {
    console.log('Mongoose 连接关闭');
});

const closeClient = () => {
    mongoClient.close();
}

module.exports = {
    mongoClient: mongoClient,
    closeClient: closeClient
};