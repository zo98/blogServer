const { getArticle, updateArticle } = require("../dao/articleDao");
const { isValid } = require("../utils/index");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config/index");
module.exports = {
  async getArticle(params = {}) {
    const [err, data] = await getArticle(params);
    if (!err) {
      return { code: 1, data, msg: "success" };
    } else {
      return { code: 0, data, msg: err.sqlMessage };
    }
  },
  async updateArticle(params) {
    const { id, token, title, content, classify_id } = params;
    if (isValid(id)) {
    }
    if (isValid(title) && isValid(classify_id)) {
      const preview_content = content.split("/n").splice(0, 15).join("");
      const user = jsonwebtoken.verify(token, SECRET);
      const temp = {
        author_id: user.id,
        title,
        content,
        preview_content,
        classify_id,
      };
      const [err, res] = await updateArticle(temp);
    }
    return { code: 0, msg: "" };
  },
};
