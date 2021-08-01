const query = require("../db/index");

module.exports = {
  getArticle(params) {
    const { title, id } = params;
    if (id) {
      return query(
        `SELECT
        article.id,
        article.author_id,
        users.nick_name AS author
        article.classify_id,
        classify.\`name\`  AS classify_name,
        article.title,
        article.content,
        article.preview_content,
        article.create_time,
        article.update_time
      FROM
        article
        LEFT JOIN classify ON article.classify_id = classify.id
        LEFT JOIN users ON article.author_id = users.id
      WHERE
        article.id =${params.id}`
      );
    }
    return query(
      `SELECT
      article.id,
      article.author_id,
      users.nick_name AS author,
      article.classify_id,
      classify.\`name\`  AS classify_name,
      article.title,
      article.preview_content,
      article.create_time,
      article.update_time
    FROM
      article
      LEFT JOIN classify ON article.classify_id = classify.id
      LEFT JOIN users ON article.author_id = users.id
    WHERE
      title LIKE '%${title}%'
    `
    );
  },
  updateArticle(params) {
    const { id, author_id, title, content, preview_content, classify_id } =
      params;
    if (id) {
      return query(
        `UPDATE article SET title=${title},content=${content},preview_content=${preview_content},classify_id=${classify_id} WHERE id=${id}`
      );
    }
    return query(`INSERT INTO article ( author_id,title,content,preview_content,classify_id)
    VALUES('${author_id}','${title}','${content}','${preview_content}','${classify_id}')`);
  },
};
