var express = require('express');
var router = express.Router();
const UserService = require('../services/UserService');
let userService = new UserService();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userService.getUserList().then((data)=>{
    res.json({
      code:0,
      msg:'OK',
      data:data
    })
  });
  // res.send('respond with a resource');
});

router.get('/login',(req,res,next)=>{
  res.json({
    code:0,
    msg:'OK',
    data:{result:true}
  })
});
module.exports = router;
