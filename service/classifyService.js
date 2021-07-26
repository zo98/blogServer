const { getClassify } = require("../dao/classifyDao");

module.exports = {
  async getClassify(params = {}) {
    const [err, data] = await getClassify(params);
    if (!err) {
      return { code: 1, data, msg: "success" };
    } else {
      return { code: 0, data, msg: err.sqlMessage };
    }
  },
};
