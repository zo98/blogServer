import mysql = require('mysql')
const { dbConfig, user } = require("../config/index");

class DataBase {
  fields: string[]
  AUTO_INCREMENT: number
  pool: mysql.Pool
  constructor() {
    this.pool = mysql.createPool(dbConfig)
    this.AUTO_INCREMENT = 0
    this.fields = ['id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id"', 'create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间"', 'update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间"',]
  }
  // 连接数据库
  connection() {
    console.log('连接数据库...');
    this.pool.getConnection((err, connection) => {

    })
  }

  query(sql: string) {
    const self = this
    return new Promise((resolve, reject) => {
      self.pool.getConnection((err, connection) => {


      })
    })

  }
  init(){
    
  }
}

class Classify extends DataBase {
  constructor() {
    super()
    this.fields = [...this.fields, 'name VARCHAR(80) NOT NULL COMMENT "分类名"', 'cover VARCHAR(255) COMMENT "分类封面"']
  }
}


class Article extends DataBase {
  constructor() {
    super()
    this.fields = [...this.fields]
  }
}

class Users extends DataBase {
  constructor() {
    super()
    this.fields = [...this.fields,]
  }
}

export = {}