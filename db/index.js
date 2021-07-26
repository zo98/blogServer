const mysql = require("mysql");
const { dbConfig } = require("../config/index");
const { initArticle, initClassify, initUsers } = require("./initDB");

const pool = mysql.createPool(dbConfig);

function query(sql, callback) {
  pool.getConnection((err, connection) => {
    connection.query(sql, callback);
    connection.release();
  });
}

function connectDb() {
  console.log("连接数据库中");
  pool.getConnection((err, connection) => {
    if (err && err.errno === 1049) {
      // 数据库不存在，创建数据库,创建表
      console.log("初始化数据库");
      const connect = mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
      });
      connect.query(`create database ${dbConfig.database}`, (err) => {
        if (!err) {
          connect.destroy();
          connectDb();
        }
      });
    } else if (err) {
      console.log("连接数据库失败,60秒后重试", err);
      setTimeout(() => {
        connectDb();
      }, 60000);
    } else {
      console.log("数据库连接成功");
      initArticle(connection);
      initClassify(connection);
      initUsers(connection);
      connection.release();
    }
  });
}

connectDb();

module.exports = query;
