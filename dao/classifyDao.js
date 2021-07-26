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
        query("SELECT * FROM classify", (err, res, fields) => {
          resolve([err, res]);
        });
      }
    });
  },
};
