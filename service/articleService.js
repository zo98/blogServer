const { getArticle, updateArticle } = require("../dao/articleDao");
const { isValid } = require("../utils/index");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config/index");
module.exports = {
  async getArticle(params = {}) {
    params = {
      pageSize: 10,
      currentPage: 1,
      keyWords: "",
      ...params,
    };
    let temp;
    let { pageSize, currentPage, keyWords, id } = params;
    pageSize = Number(pageSize);
    currentPage = Number(currentPage);
    if (isValid(id)) {
      temp = { id };
    } else {
      temp = { title: keyWords };
    }
    const [err, res] = await getArticle(temp);

    if (!err) {
      if (isValid(id)) {
        return { code: 1, data: res, msg: "success" };
      } else {
        const total = res.length;

        if (currentPage >= Math.ceil(total / pageSize)) {
          currentPage = Math.ceil(total / pageSize);
        } else if (currentPage < 0) {
          currentPage = 1;
        }
        const offset = (currentPage - 1) * pageSize;
        const records = res.slice(offset, offset + pageSize);
        const data = {
          records,
          total,
          pageSize,
          currentPage,
        };
        return { code: 1, data, msg: "success" };
      }
    } else {
      return { code: 0, msg: err.sqlMessage };
    }
  },
  async updateArticle(params) {
    const { id, token, title, content, classify_id } = params;
    const preview_content = content.split("/n").splice(0, 20).join("");
    let temp = {};
    if (isValid(id)) {
      temp = {
        id,
        title,
        content,
        preview_content,
        classify_id,
      };
    }
    if (isValid(title) && isValid(classify_id)) {
      const user = jsonwebtoken.verify(token, SECRET);
      temp = {
        author_id: user.id,
        title,
        content,
        preview_content,
        classify_id,
      };
    }

    const [err, res] = await updateArticle(temp);

    if (!temp.id) {
      if (!err && res.affectedRows) {
        return { code: 1, msg: "added success" };
      }
      return { code: 0, msg: err };
    }

    if (temp.id) {
      if (!err && res.affectedRows) {
        return { code: 1, msg: "update success" };
      }
      return { code: 0, msg: err };
    }
  },
};
