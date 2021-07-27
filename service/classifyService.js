const { getClassify } = require("../dao/classifyDao");

module.exports = {
  async getClassify(params = {}) {
    params = {
      pageSize: 10,
      currentPage: 1,
      keyWords: "",
      ...params,
    };
    const { pageSize, currentPage } = params;
    const [err, records, total] = await getClassify(params);
    if (!err) {
      const data = { records, pageSize, currentPage, total };
      return { code: 1, data, msg: "success" };
    } else {
      return { code: 0, msg: err.sqlMessage };
    }
  },
};
