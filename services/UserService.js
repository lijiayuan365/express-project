const UserDao = require('../dao/UserDao');
const axios = require('axios');
const cheerio = require('cheerio')

let userDao = new UserDao();

class UserService {
  async getUserList() {
    try {
      // 调用 dao 层查询数据
      let userList = await userDao.findAll();
      return userList;
    } catch (err) {
      console.log(`getUserList error--> ${error}`);
      return error;
    }
  }
  async writeUser() {
    try {
      let users = [{name:'ljy',id:3},{name:'ljy',id:4}]
      let res = await userDao.saveMany(users)
      console.log(res)
      return res;
    } catch (error) {
      console.log(`writeUser error--> ${error}`);
      return error;
    }
    
  }
  async spider() {
    try {
      let url = 'https://lijiayuan.top/';
      let response = await axios.get(url)
      let html = response.data.toString();
      const $ = cheerio.load(html)
      let data = [];
      let arr = $('.post-type-normal')
        
      arr = arr.map((item,a,b) =>  {
          data.push(a.name)
      })
      console.log(data)
    } catch (error) {
      console.log(`spider error --------->${error}`)
    }
  } 
}
module.exports = UserService;