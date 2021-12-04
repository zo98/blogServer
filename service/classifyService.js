const {
  getClassify,
  updateClassify,
  deleteClassify,
  getHotClassify,
} = require("../dao/classifyDao");
const {
  isValid,
  replaceImgPathToName,
  replaceNameToPath,
} = require("../utils/index");

module.exports = {
  async getClassify(params = {}) {
    params = {
      pageSize: 10,
      currentPage: 1,
      keyWords: "",
      ...params,
    };
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
  async updateClassify(params) {
    let { id, name, cover } = params;

    if (isValid(id) && isValid(name)) {
      // 修改
      const [err, res] = await updateClassify(params);
      console.log(err, res);

      if (!err && res.affectedRows) {
        return { code: 1, msg: "update success" };
      } else {
        return { code: 0, msg: "update fail" };
      }
    }

    if (isValid(name)) {
      // 添加
      const [err, res] = await updateClassify(params);
      if (!err && res.affectedRows) {
        return { code: 1, msg: "added success" };
      } else {
        return { code: 0, msg: "added fail" };
      }
    }
    return { code: 0, msg: "fail,invalid value" };
  },
  async deleteClassify(params) {
    const { id } = params;
    if (isValid(id)) {
      console.log(params);
      const [err, res] = await deleteClassify(params);
      if (!err && res.affectedRows) {
        return { code: 1, msg: "success" };
      }
      return { code: 0, msg: err };
    }
    return { code: 0, msg: err };
  },
  async getHotClassify(params = {}) {
    params = {
      pageSize: 10,
      currentPage: 1,
      ...params,
    };
    let { pageSize, currentPage } = params;
    currentPage = Number(currentPage);
    pageSize = Number(pageSize);
    const offset = (currentPage - 1) * pageSize;
    try {
      let [err, records] = await getHotClassify({ offset, pageSize });
      if (!err) {
        return { code: 1, data: { records }, msg: "success" };
      } else {
        return { code: 0, data: { records: [] }, msg: err };
      }
    } catch (error) {
      return { code: 0, data: { records: [] }, msg: error };
    }
  },
};
