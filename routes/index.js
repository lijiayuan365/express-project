var express = require('express');
var router = express.Router();
const ArticleService = require('../services/ArticleService')
let articleService = new ArticleService()
// tests
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/spider',(req,res) => {
  articleService.spider().then(() => {

    res.json({
      code:0,
      
    })
  })
})
router.use('/user', require('./users'));
module.exports = router;
