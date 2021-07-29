const mysql = require("mysql");

const pool = mysql.createPool({
  host: "192.168.138.128",
  user: "root",
  port: "3306",
  password: "3729",
  database: "test",
});

pool.getConnection((err, connection) => {
  // connection.query(
  //   `CREATE TABLE classify(
  //   id INT PRIMARY KEY,
  //   name VARCHAR(80) NOT NULL,
  //   create_time TIMESTAMP DEFAULT NOW(),
  //   update_time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  // )`,
  //   (err, res, fields) => {
  //     console.log(err, res, fields);
  //   }
  // );
  // connection.query(
  //   `INSERT INTO classify (id, name ) VALUES(UUID_SHORT(),'12334')`,
  //   (err, res, fields) => {
  //     console.log(err, res, fields);
  //   }
  // );
  // connection.release();
});
