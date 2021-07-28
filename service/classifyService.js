const { getClassify } = require("../dao/classifyDao");

module.exports = {
  async getClassify(params = {}) {
    params = {
      pageSize: 10,
      currentPage: 1,
      keyWords: "",
      ...params,
    };
    console.log("params", params);
    let { pageSize, currentPage } = params;
    currentPage = Number(currentPage);
    pageSize = Number(pageSize);
    let [err, records] = await getClassify(params);

    if (!err) {
      let total = records.length;

      if (currentPage >= Math.ceil(total / pageSize)) {
        currentPage = Math.ceil(total / pageSize);
      } else if (currentPage < 0) {
        currentPage = 1;
      }
      const offset = (currentPage - 1) * pageSize;
      records = records.slice(offset, offset + pageSize);
      const data = { records, pageSize, currentPage, total };
      return { code: 1, data, msg: "success" };
    } else {
      return { code: 0, msg: err.sqlMessage };
    }
  },
};
