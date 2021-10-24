const { initUser } = require("../config/index");
module.exports = {
  // 初始化分类
  initClassify(connection) {
    // ON UPDATE CURRENT_TIMESTAMP mysql5.6以上才能使用
    connection.query(
      `CREATE TABLE classify(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id",
      name VARCHAR(80) NOT NULL COMMENT "分类名",
      cover VARCHAR(255) COMMENT "分类封面",
      create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间",
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间"
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
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id",
      author_id INT NOT NULL COMMENT "作者",
      title VARCHAR(100) NOT NULL COMMENT "标题",
      content LONGTEXT COMMENT "文章内容",
      preview_content LONGTEXT COMMENT "预览内容",
      classify_id INT NOT NULL COMMENT "分类",
      imgs LONGTEXT COMMENT "文章内容图片",
      create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间", 
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间",
      data_status TINYINT(1) DEFAULT '0' COMMENT "状态",
      views INT COMMENT "累计查看量",
      likes INT COMMENT "累计喜欢",
      isDraft TINYINT(1) DEFAULT '0' COMMENT "是否为草稿"
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
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT "id",
      nick_name VARCHAR(80) COMMENT "昵称",
      account VARCHAR(80) NOT NULL COMMENT "账号",
      password VARCHAR(80) NOT NULL COMMENT "密码",
      create_time TIMESTAMP DEFAULT NOW() COMMENT "创建时间",
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT NULL COMMENT "最后一次更新时间"
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
