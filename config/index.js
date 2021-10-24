const { hashSync } = require("bcryptjs");
module.exports = {
  dbConfig: {
    host: "192.168.189.129",
    user: "root",
    port: "3306",
    password: "3729",
    database: "blog",
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
  },
  SECRET: "BLOGSERVERSECRET",
  // 初始账户
  initUser: { account: "admin", password: hashSync("Admin123") },
  configPath: {
    img: "public/sources/images",
    temp: "public/sources/temp",
    source: "sources/images",
  },
  serverHost: "http://localhost:8000",
};
