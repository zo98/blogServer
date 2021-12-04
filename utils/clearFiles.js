const fs = require("fs");
const { join } = require("path");
const { readFile } = require("fs/promises");
const query = require("../db/index");
const { configPath } = require("../config/index");
const reg = new RegExp(`/${configPath.source}/`);
// SELECT cover FROM classify UNION SELECT imgs FROM article
module.exports = {
  clearImgs() {
    console.log("获取需要清理的文件");
    const files = new Promise((resolve, reject) => {
      fs.readdir("./public/sources/images/", (err, res) => {
        resolve([err, res]);
      });
    });

    const db = query(
      "SELECT cover FROM classify UNION SELECT imgs FROM article"
    );

    const system = readFile(join(__dirname, "../config/blog_config.json"), {
      encoding: "utf-8",
    });

    Promise.all([files, db, system])
      .then(([res1, res2, res3]) => {
        let [err1, files] = res1;
        let [err2, data] = res2;
        let systemData = JSON.parse(res3);
        // console.log(files, data, systemData);
        data = data.map((item) => {
          if (/\[(.*?)\]/.test(item.cover)) {
            return JSON.parse(item.cover);
          }

          return item.cover.replace(reg, "");
        });

        data = data.flat(1);
        if (systemData.blog.favicon) {
          const src = systemData.blog.favicon;
          const img = src.replace(reg, "");
          data.push(img);
        }
        if (systemData.blog.profile) {
          const src = systemData.blog.profile;
          const img = src.replace(reg, "");
          data.push(img);
        }
        console.log(data);
        if (!err1 && !err2) {
          files.forEach((item, index) => {
            console.log(`检查文件：${index + 1}/${data.length}`);
            if (!data.includes(item)) {
              fs.unlink(`./${configPath.img}/${item}`, (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`已删除 ${configPath.img}/${item}`);
                }
              });
            }
          });

          console.log("清理文件完成");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
