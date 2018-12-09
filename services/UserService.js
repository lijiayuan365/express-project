const UserDao = require('../dao/UserDao');

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
}
module.exports = UserService;