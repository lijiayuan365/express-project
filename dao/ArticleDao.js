let BaseDao = require('./BaseDao');
// 导入对应的实体
let Article = require('../models/article');

class ArticleDao extends BaseDao{
  constructor() {
    super(Article);
  }
  //如果有啥特殊需求的话，自己再重写方法咯
}

module.exports = ArticleDao;