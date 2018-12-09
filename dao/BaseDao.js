class BaseDao {
  /**
   * 子类构造传入对应的 Model 类
   *
   * @param Model
   */
  constructor(Model) {
    this.Model = Model;
  }


  /**
   * 使用 Model 的 静态方法 create() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  async create(obj) {
    let entity = new this.Model(obj);
    try {
      let dao = await this.Model.create(entity);
      console.log('create result--> ', dao);
      return dao;
    } catch (error) {
      console.log('create error--> ', error);
      return error;
    }
  }


  /**
   * 使用 Model save() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  async save(obj) {
    let entity = new this.Model(obj);
    try {
      let result = await entity.save();
      return result;
    } catch (error) {
      console.log('save error--> ', error);
      return error;
    }
  }


  /**
   * 查询所有符合条件 docs
   *
   * @param condition 查找条件
   * @param constraints 查找配置
   * @returns {Promise}
   */
  async findAll(condition, constraints) {
    try {
      let data = await this.Model.find(condition, constraints ? constraints : null);
      return data;
    } catch (error) {
      console.log('findAll error--> ', error);
      return error;
    }
  }


  /**
   * 查找符合条件的第一条 doc
   *
   * @param condition 查询条件
   * @param constraints 查找配置
   * @returns {Promise}
   */
  async findOne(condition, constraints) {
    try {
      let data = await this.Model.findOne(condition, constraints ? constraints : null);
      return data;
    } catch (error) {
      console.log(`findOne error--> ${error}`);
      return error;
    }
  }


  /**
   * 查找排序之后的第一条
   *
   * @param condition
   * @param orderColumn
   * @param orderType
   * @returns {Promise}
   */
  async findOneByOrder(condition, orderColumn, orderType) {
    try {
      let data = await this.Model.findOne(condition)
        .sort({[orderColumn]: orderType})
        .exec();
      return data;
    } catch (error) {
      console.log(`findOneByOrder--> ${error}`);
      return error;
    }
  }


  /**
   * 更新 docs
   *
   * @param condition 查找条件
   * @param updater 更新操作
   * @returns {Promise}
   */
  async update(condition, updater) {
    try {
      let result = await this.Model.update(condition, updater);
      return result;
    } catch (error) {
      console.log(`update error--> ${error}`);
      return error;
    }
  }


  /**
   * 移除 doc
   *
   * @param condition 查找条件
   * @returns {Promise}
   */
  async remove(condition) {
    try {
      let result = await this.Model.remove(condition);
      return result;
    } catch (error) {
      console.log(`remove error--> ${error}`);
      return error;
    }
  }
}


module.exports = BaseDao;