const query = require("../db/index");
module.exports = {
  getClassify(params) {
    return new Promise((resolve, reject) => {
      if (params.id) {
        query(
          `SELECT * FROM classify WHERE id=${params.id}`,
          (err, res, fields) => {
            resolve([err, res]);
          }
        );
      } else {
        const { currentPage, pageSize, keyWords } = params;
        const offset = (currentPage - 1) * pageSize;
        query(
          `SELECT * FROM classify WHERE classify_name LIKE '%${keyWords}%'`,
          (err, res, fields) => {
            let total = 0;
            if (res) {
              total = res.length;
              res = res.slice(offset, offset + pageSize);
            }
            resolve([err, res, total]);
          }
        );
      }
    });
  },
};
