const { initUser } = require("../config/index");
module.exports = {
  // 初始化分类
  initClassify(connection) {
    // create_time - 创建时间
    // name - 分类名称
    // ON UPDATE CURRENT_TIMESTAMP mysql5.6以上才能使用
    connection.query(
      `CREATE TABLE classify(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      name VARCHAR(80) NOT NULL,
      create_time TIMESTAMP DEFAULT NOW(),
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL
    ) AUTO_INCREMENT = 0 ;`,
      (error) => {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          console.log("创建classify表成功");
        }
      }
    );
  },
  initArticle(connection) {
    connection.query(
      `CREATE TABLE article(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      author_id INT NOT NULL,
      title VARCHAR(100) NOT NULL,
      content LONGTEXT,
      preview_content LONGTEXT,
      classify_id INT NOT NULL,
      imgs LONGTEXT,
      create_time TIMESTAMP DEFAULT NOW(), 
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL,
      data_status TINYINT(1) DEFAULT '0',
      isDraft TINYINT(1) DEFAULT '0'
    ) AUTO_INCREMENT = 0 ;`,
      (error) => {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          console.log("创建article表成功");
        }
      }
    );
  },
  initUsers(connection) {
    connection.query(
      `CREATE TABLE users(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      nick_name VARCHAR(80),
      account VARCHAR(80) NOT NULL,
      password VARCHAR(80) NOT NULL,
      create_time TIMESTAMP DEFAULT NOW(),
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL
    ) AUTO_INCREMENT = 0 ;`,
      (error) => {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          console.log("创建users表成功");
          connection.query(
            `INSERT INTO users(account,password,nick_name) VALUES('${initUser.account}','${initUser.password}','${initUser.account}')`,
            (err, res) => {
              if (!err && res.affectedRows) {
                console.log("创建初始账户成功");
              }
            }
          );
        }
      }
    );
  },
};
