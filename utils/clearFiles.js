const fs = require("fs");
const query = require("../db/index");
const { configPath } = require("../config/index");

module.exports = {
  clearImgs() {
    const files = new Promise((resolve, reject) => {
      fs.readdir("./public/sources/images/", (err, res) => {
        resolve([err, res]);
      });
    });

    const db = query("SELECT imgs FROM article");

    Promise.all([files, db]).then(([res1, res2]) => {
      let [err1, files] = res1;
      let [err2, data] = res2;
      if (!err1 && !err2) {
        let temp = [];
        data.forEach((item) => {
          if (item.imgs) {
            try {
              temp.push(JSON.parse(item.imgs));
            } catch (error) {}
          }
        });
        data = temp.flat(2);
        files.forEach((item) => {
          if (!data.includes(item)) {
            fs.unlink(`./${configPath.img}/${item}`, (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  },
};
