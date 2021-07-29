const query = require("../db/index");

module.exports = {
  getArticle(params) {
    if (params.id) {
      return query(
        `SELECT
        article.id,
        article.author_id,
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
        article.id =${params.id}`
      );
    }
    return query(
      `SELECT
      article.id,
      article.author_id,
      article.title,
      article.content,
      article.preview_content,
      article.create_time,
      article.update_time,
      classify.\`name\`  AS classify_name
    FROM
      article
      LEFT JOIN classify ON article.classify_id = classify.id
    `
    );
  },
  updateArticle(params) {
    const { id } = params;
    if (id) {
      return query();
    }
    return query(`INSERT INTO classify ( author_id,title,content,preview_content,classify_id)
    VALUES('${author_id}','${title}','${content}','${preview_content}','${classify_id}')`);
  },
};
