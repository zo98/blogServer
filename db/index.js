const mysql = require("mysql");
const { dbConfig, user } = require("../config/index");
const { initArticle, initClassify, initUsers } = require("./initDB");

let pool = mysql.createPool(dbConfig);

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (!err) {
        connection.query(sql, (err, res, fields) => {
          resolve([err, res, fields]);
        });
        connection.release();
      } else {
        console.log("error", err);
      }
    });
  });
}

function connectDb() {
  console.log("连接数据库中");
  pool.getConnection((err, connection) => {
    if (err && err.errno === 1049) {
      // 数据库不存在，创建数据库
      console.log("初始化数据库");
      const config = { ...dbConfig };
      delete config.database;
      const connect = mysql.createConnection(config);
      connect.query(`create database ${dbConfig.database}`, (err) => {
        if (!err) {
          connect.destroy();
          connectDb();
        }
        console.log(err);
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
