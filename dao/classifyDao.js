const query = require("../db/index");
module.exports = {
  getClassify(params) {
    const { id } = params;
    return new Promise((resolve, reject) => {
      if (id) {
        query(`SELECT * FROM classify WHERE id=${id}`, (err, res, fields) => {
          resolve([err, res]);
        });
      } else {
        const { keyWords } = params;
        query(
          `SELECT * FROM classify WHERE classify_name LIKE '%${keyWords}%'`,
          (err, res, fields) => {
            resolve([err, res]);
          }
        );
      }
    });
  },
};
