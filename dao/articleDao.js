const query = require("../db/index");

module.exports = {
  getArticle(params) {
    const { title, id } = params;
    if (id) {
      // 浏览量
      query(`UPDATE article set views= IFNULL(views,0)+1 WHERE id = '${id}'`);
      return query(
        `SELECT
        article.id,
        article.author_id,
        users.nick_name AS author,
        article.classify_id,
        classify.\`name\`  AS classify_name,
        article.title,
        article.content,
        IFNULL(article.views,0) AS views,
        IFNULL(article.likes,0) AS likes,
        article.preview_content,
        article.imgs,
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
      IFNULL(article.views,0) AS views,
      IFNULL(article.likes,0) AS likes,
      article.preview_content,
      article.imgs,
      article.create_time,
      article.update_time,
      article.data_status      
    FROM
      article
      LEFT JOIN classify ON article.classify_id = classify.id
      LEFT JOIN users ON article.author_id = users.id
    WHERE
      title LIKE '%${title}%' AND data_status=0
      ORDER BY create_time DESC
    `
    );
  },
  updateArticle(params) {
    const {
      id,
      author_id,
      title,
      content,
      preview_content,
      classify_id,
      imgs,
    } = params;
    if (id) {
      return query(
        `UPDATE article SET title='${title}',content='${content}',preview_content='${preview_content}',classify_id='${classify_id}',imgs='${imgs}' WHERE id='${id}'`
      );
    }
    return query(`INSERT INTO article ( author_id,title,content,preview_content,imgs,classify_id)
    VALUES('${author_id}','${title}','${content}','${preview_content}','${imgs}','${classify_id}')`);
  },
  deleteArticle(params) {
    const { id, status } = params;
    if (status) {
      return query(`DELETE FROM article WHERE id=${id}`);
    }
    return query(`UPDATE article SET data_status=1 WHERE id=${id}`);
  },
  getArticleByClassify(params) {
    return query(
      `SELECT
      article.id,
      article.author_id,
      users.nick_name AS author,
      article.classify_id,
      classify.\`name\`  AS classify_name,
      article.title,
      IFNULL(article.views,0) AS views,
      IFNULL(article.likes,0) AS likes,
      article.preview_content,
      article.imgs,
      article.create_time,
      article.update_time,
      article.data_status      
    FROM
      article
      LEFT JOIN classify ON article.classify_id = classify.id
      LEFT JOIN users ON article.author_id = users.id
    WHERE
      classify_id='${params.id}' AND data_status=0
      ORDER BY create_time DESC
    `
    );
  },
};
