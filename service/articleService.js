const { getArticle } = require("../dao/articleDao");

module.exports = {
  async getArticle(params = {}) {
    const [err, data] = await getArticle(params);
    if (!err) {
      return { code: 1, data, msg: "success" };
    } else {
      return { code: 0, data, msg: err.sqlMessage };
    }
  },
};
