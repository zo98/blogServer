module.exports = {
  dbConfig: {
    host: "192.168.138.128",
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
  user: { account: "admin", password: "Admin123" },
  configPath: {
    img: "public/sources/images",
    temp:'public/sources/temp',
    source: "sources/images",
  },
  serverHost: "http://localhost:8000",
};
