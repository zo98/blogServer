const query = require("../db/index");

module.exports = {
  login(params) {
    const { account, password } = params;
    return query(`SELECT * FROM users WHERE account='${account}' limit 1`);
  },
};
