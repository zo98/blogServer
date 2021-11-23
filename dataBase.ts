import mysql = require('mysql')
const { dbConfig, user } = require("./config/index");

class DataBase {
  fields: string[]
  pool: mysql.Pool
  tableName: string | undefined
  constructor() {
    this.tableName = undefined
    this.pool = mysql.createPool(dbConfig)
    this.fields = ['id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id"', 'create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间"', 'update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间"',]
  }
  // 连接数据库
  connection(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('连接数据库...');
      this.pool.getConnection((err, connection) => {

        if (err && err.errno === 1049) {
          // 数据库不存在，创建数据库
          console.log("初始化数据库");
          const config = { ...dbConfig };
          delete config.database;
          const tempConnection = mysql.createConnection(config);
          tempConnection.query(`create database ${dbConfig.database}`, (err) => {
            if (!err) {
              tempConnection.destroy();
              this.connection();
            }
            console.log(err);
          });

        }
        else if (err) {
          console.log("连接数据库失败,60秒后重试", err);
          setTimeout(() => {
            this.connection();
          }, 60000);
          // connection.release()
        }
        else {
          console.log("数据库连接成功");
          resolve(undefined)
          // 创建数据表
          // connection.release()
        }
        connection.release()
      })
    })
  }

  query(sql: string) {
    const self = this
    return new Promise((resolve, reject) => {
      self.pool.getConnection((err, connection) => {
        if (err) {
          resolve([err]);
          connection.release()
          return
        }
        connection.query(sql, (err, res, fields) => {
          resolve([err, res, fields]);
          connection.release()
        });
      })
    })
  }
  init() {
    if (!this.tableName) {
      return
    }
    const createTableSql = `CREATE TABLE ${this.tableName}(${this.fields.join(',')}) AUTO_INCREMENT = 0 ;`
    console.log('sql', createTableSql);

    // const sql = this.fields.join(',')
    // this.query()
  }
}

class Classify extends DataBase {
  tableName: string
  constructor() {
    super()
    this.tableName = "classify"
    this.fields = [...this.fields, 'name VARCHAR(80) NOT NULL COMMENT "分类名"', 'cover VARCHAR(255) COMMENT "分类封面"']
  }
}


class Article extends DataBase {
  tableName: string
  constructor() {
    super()
    this.tableName = "article"
    this.fields = [...this.fields]
  }
}

class Users extends DataBase {
  tableName: string
  constructor() {
    super()
    this.tableName = "users"
    this.fields = [...this.fields,]
  }
}

const database = new DataBase()
const classify = new Classify()
const users = new Users()
// database.connection().then()
// classify.init()
// console.log(database);
// console.log(classify);



export = {}