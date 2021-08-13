const {
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../dao/articleDao");
const { isValid } = require("../utils/index");
const { configPath, serverHost } = require("../config/index");
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
        res.forEach((item) => {
          item.content = item.content.replace(/&#34;|&#349;/g, (_m) => {
            switch (_m) {
              case "&#34;":
                return '"';
              case "&#39;":
                return "'";
              default:
                return _m;
            }
          });
        });
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
    let { id, token, title, content, classify_id } = params;

    let imgs = [];
    const regImg = new RegExp(
      `"${serverHost}/${configPath.source}/(.*?)"`,
      "g"
    );
    content = content.replace(regImg, (_, a) => {
      imgs.push(a);
      return `"${serverHost}/${configPath.source}/${a}"`;
    });

    imgs = Array.from(new Set(imgs));

    content = content.replace(/'|"/g, (_m) => {
      switch (_m) {
        case '"':
          return "&#34;";
        case "'":
          return "&#39;";
        default:
          return _m;
      }
    });

    let preview_content = content.replace(/(<.*?>)|(<\/.*?>)/g, "");
    preview_content = preview_content = preview_content.substr(0, 200);
    let temp;
    if (isValid(title) && isValid(classify_id)) {
      const user = jsonwebtoken.verify(token, SECRET);
      temp = {
        author_id: user.id,
        title,
        content,
        preview_content,
        classify_id,
        imgs: JSON.stringify(imgs),
      };

      if (isValid(id)) {
        temp.id = id;
      }
    }

    const [err, res] = await updateArticle(temp);
    console.log(temp);
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
  async deleteArticle(params) {
    const { id, status } = params;
    if (isValid(id)) {
      const [err, res] = deleteArticle(params);
      if (!err && res.affectedRows) {
        return { code: 1, msg: "success" };
      }
      return { code: 0, msg: err.sqlMessage };
    }
    return { code: 0, msg: "fail" };
  },
};
