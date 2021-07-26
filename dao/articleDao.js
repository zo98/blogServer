const query = require("../db/index");

module.exports = {
  getArticle(params) {
    return new Promise((resolve, reject) => {
      if (params.id) {
        query(
          `SELECT
          article.id,
          article.author,
          article.title,
          article.content,
          article.preview_content,
          article.create_time,
          article.update_time,
          classify.classify_name
        FROM
          article
          LEFT JOIN classify ON article.classify = classify.id 
        WHERE
          article.id =${params.id}`,
          (err, res, fields) => {
            resolve([err, res]);
          }
        );
      } else {
        query(
          `SELECT
          article.id,
          article.author,
          article.title,
          article.content,
          article.preview_content,
          article.create_time,
          article.update_time,
          classify.classify_name
        FROM
          article
          LEFT JOIN classify ON article.classify = classify.id 
        `,
          (err, res, fields) => {
            resolve([err, res]);
          }
        );
      }
    });
  },
};
