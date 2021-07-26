const query = require("../db/index");

module.exports = {
  login(params) {
    return new Promise((resolve, reject) => {
      const { account, password } = params;
      query(
        `SELECT * FROM users WHERE account='${account}' limit 1`,
        (err, res, fields) => {
          resolve([err, res]);
        }
      );
    });
  },
};
