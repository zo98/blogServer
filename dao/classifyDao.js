const query = require("../db/index");
module.exports = {
  getClassify(params) {
    const { id } = params;
    if (id) {
      return query(`SELECT * FROM classify WHERE id=${id}`);
    }
    const { keyWords } = params;
    return query(`SELECT * FROM classify WHERE name LIKE '%${keyWords}%'`);
  },
  getHotClassify(params) {
    const { offset, pageSize } = params;
    return query(`SELECT
    classify.id,
    classify.\`name\`,
    COUNT(*) AS nums
  FROM
    article
    LEFT JOIN classify ON article.classify_id = classify.id 
  GROUP BY
    classify_id
    ORDER BY nums DESC
    LIMIT ${offset},${pageSize}
    `);
  },
  updateClassify(params) {
    const { id, name } = params;
    if (id) {
      return query(`UPDATE classify SET name='${name}' WHERE id='${id}'`);
    }
    return query(`INSERT INTO classify ( name )
    VALUES('${name}')`);
  },
  deleteClassify(params) {
    const { id } = params;
    return query(`DELETE FROM classify WHERE id=${id}`);
  },
};
