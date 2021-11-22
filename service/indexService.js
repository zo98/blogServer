const query = require("../db/index");
const { readFile } = require("fs/promises");
const { join } = require("path");
module.exports = {
  async getBlogData() {
    const p1 = query(
      `SELECT
      id,
      title,
      create_time 
    FROM
      article 
    WHERE
      data_status = 0 
    ORDER BY
      create_time DESC 
      LIMIT 5`
    );
    const p2 = query(`SELECT
    classify_id,
    classify.\`name\` AS classify_name,
    COUNT( classify_id ) AS count 
  FROM
    article
    LEFT JOIN classify ON classify_id = classify.id 
  WHERE
    data_status = 0 
  GROUP BY
    classify_id 
  ORDER BY
    count DESC 
    LIMIT 5`);

    const p3 = readFile(join(__dirname, "../config/blog_config.json"), {
      encoding: "utf-8",
    });

    const p4 = query(`SELECT
    id,
    title,
    imgs,
    preview_content 
  FROM
    article 
  WHERE
    imgs IS NOT NULL 
    AND data_status = 0 
  ORDER BY
    create_time 
    LIMIT 3`);
    const [res1, res2, res3, res4] = await Promise.allSettled([p1, p2, p3, p4]);
    let article = [],
      classify = [],
      config = {},
      waterfall = [];
    if (res1.status === "fulfilled") {
      let [err, res] = res1.value;
      article = res;
    }
    if (res2.status === "fulfilled") {
      let [err, res] = res2.value;
      classify = res;
    }
    if (res3.status === "fulfilled") {
      try {
        config = JSON.parse(res3.value);
      } catch (error) {}
    }
    if (res4.status === "fulfilled") {
      let [err, res] = res4.value;
      waterfall = res.map((item) => {
        try {
          item.imgs = JSON.parse(item.imgs);
        } catch (error) {
          item.imgs = [];
        }
        return item;
      });
    }

    return { code: 1, data: { article, classify, config, waterfall } };
  },
};
