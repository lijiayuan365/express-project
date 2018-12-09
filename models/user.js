const mongoose = require('mongoose');
const { mongoClient } = require('../utils/db-util');

// 创建 user Schema
const user = new mongoose.Schema({
  name: String,
  id: String,
},{versionKey: false});

/*model 的参数1 导出的模块名，
参数2 创建的 Schema，
参数2 指定数据库中的集合的名字，若不加的，则抹默认取‘第一个参数s’的集合*/
let User = mongoClient.model('User', user, 'user');

module.exports = User;