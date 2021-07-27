module.exports = {
  // 初始化分类
  initClassify(connection) {
    // create_time - 创建时间
    // name - 分类名称
    // ON UPDATE CURRENT_TIMESTAMP mysql5.6以上才能使用
    connection.query(
      `CREATE TABLE classify(
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      classify_name VARCHAR(80) NOT NULL,
      create_time TIMESTAMP DEFAULT NOW(),
      update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
      author INT NOT NULL,
      title VARCHAR(100) NOT NULL,
      content LONGTEXT,
      preview_content VARCHAR(100),
      classify INT NOT NULL,
      create_time TIMESTAMP DEFAULT NOW(), 
      update_time TIMESTAMP DEFAULT NOW()
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
      create_time TIMESTAMP DEFAULT NOW()
    ) AUTO_INCREMENT = 0 ;`,
      (error) => {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          console.log("创建users表成功");
        }
      }
    );
  },
};
