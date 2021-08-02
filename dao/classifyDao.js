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
