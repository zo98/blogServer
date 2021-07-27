const { login } = require("../dao/userDao");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const { hashSync, compareSync } = require("bcryptjs");
module.exports = {
  async login(params) {
    if (params.account && params.password) {
      var [err, data] = await login(params);
      if (err) {
        return { code: 0, data, msg: err.sqlMessage };
      } else if (data.length) {
        const isSame = compareSync(params.password, data[0].password);
        if (isSame) {
          const token = jsonwebtoken.sign(
            { account: data[0].account, nike_name: data[0].nike_name },
            SECRET,
            {
              expiresIn: "6h",
            }
          );
          return {
            code: 1,
            data: {
              account: data[0].account,
              token: token,
              nick_name: data[0].nick_name,
            },
            msg: "登录成功",
          };
        } else {
          return { code: 0, msg: "账户或密码不正确" };
        }
      }
    } else {
      return { code: 0, msg: "账户或密码为空" };
    }
  },
};
