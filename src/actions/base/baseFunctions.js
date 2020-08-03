const baseFunctionsGenerator = (Model) => {
  /**
   *
   * @param {*} query
   */
  const count = (query) => Model.countDocuments(query);
  /**
   *
   * @param {*} type
   */
  const create = (type) =>
    new Promise((resolve, reject) => {
      const newType = new Model(type);
      newType.save((err, created) => {
        if (err) {
          reject(err);
        } else {
          resolve(created);
        }
      });
    });
  /**
   *
   */
  const findAll = () => Model.find({});
  /**
   *
   * @param {*} query
   */
  const findByQuery = (query) => Model.find(query);
  /**
   *
   * @param {*} _id
   */
  const findById = (_id) => Model.findById(_id);
  /**
   *
   * @param {*} query
   */
  const findOneByQuery = (query) => Model.findOne(query);
  /**
   *
   * @param {*} query
   * @param {*} type
   */
  const findByQueryAndUpdate = (query, type) => Model.findOneAndUpdate(query, type, { new: true });
  /**
   *
   * @param {Array} objects
   */
  const insertMany = (objects) => Model.insertMany(objects);
  /**
   *
   * @param {*} _id
   */
  const remove = (_id) => Model.deleteOne({ _id });
  /**
   *
   * @param {*} query
   */
  const removeByQuery = (query) => Model.deleteMany(query);
  /**
   *
   * @param {*} _id
   * @param {*} type
   */
  const update = (_id, type) => Model.findOneAndUpdate({ _id }, type, { new: true });
  /**
   *
   * @param {Array} objects
   */
  const updateMany = (objects) => Model.updateMany(objects);
  /**
   *
   * @param {*} type
   */
  const deleteMany = (type) => Model.deleteMany(type);
  /**
   *
   * @param {*} object
   */
  const validate = (object) => Model.validate(object);

  return {
    count,
    create,
    deleteMany,
    findAll,
    findByQuery,
    findById,
    findOneByQuery,
    findByQueryAndUpdate,
    insertMany,
    remove,
    removeByQuery,
    update,
    updateMany,
    validate,
  };
};

export default baseFunctionsGenerator;
