const mongoose = require('mongoose');
let mongodbConfig = require('../config/db.json').mongodb;

/**
 * 配置 mongoDB options
 */
function getMongoOptions() {
  let options = {
    poolSize: 5, // 连接池中维护的连接数
    reconnectTries: Number.MAX_VALUE,
    keepAlive: 120,
  };
  if (mongodbConfig.user) options.user = mongodbConfig.user;
  if (mongodbConfig.pwd) options.pwd = mongodbConfig.pwd;
  if (mongodbConfig.replicaSet.name) options.replicaSet = mongodbConfig.replicaSet.name;
  return options;
}

/**
 * 拼接字符串
 */
function getMongoUrl() {
  let mongoUrl = 'mongodb://';
  let dbName = mongodbConfig.db;
  let replicaSet = mongodbConfig.replicaSet;
  if (replicaSet.name) { // 如果配置了 replicaSet 的名字 则使用 replicaSet
    let members = replicaSet.members;
    for (let member of members) {
      mongoUrl += `${member.host}:${member.port},`;
    }
    mongoUrl = mongoUrl.slice(0, -1); // 去掉末尾逗号
  } else {
    mongoUrl += `${mongodbConfig.host}:${mongodbConfig.port}`;
  }
  mongoUrl += `/${dbName}`;

  return mongoUrl;
}
/**
 * 创建 Mongo 连接，内部维护了一个连接池，全局共享
 */

let mongoClient = mongoose.createConnection(getMongoUrl(),{ useNewUrlParser: true },(err,res)=>{
  if(err){
    console.log(err)
  }},getMongoOptions());

/**
 * Mongo 连接成功回调
 */
mongoClient.on('connected', function () {
  console.log('Mongoose connected to ' + getMongoUrl());
});
/**
 * Mongo 连接失败回调
 */
mongoClient.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
/**
 * Mongo 关闭连接回调
 */
mongoClient.on('disconnected', function () {
  console.log('Mongoose disconnected');
});


/**
 * 关闭 Mongo 连接
 */
function close() {
  mongoClient.close();
}


module.exports = {mongoClient, close};