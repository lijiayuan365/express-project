let BaseDao = require('./BaseDao');
// 导入对应的实体
let User = require('../models/user');

class UserDao extends BaseDao{
  constructor() {
    super(User);
  }
  //如果有啥特殊需求的话，自己再重写方法咯
}

module.exports = UserDao;