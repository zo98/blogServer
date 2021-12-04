const fs = require("fs");
const query = require("../db/index");
const { configPath } = require("../config/index");
// SELECT cover FROM classify UNION SELECT imgs FROM article
module.exports = {
  clearImgs() {
    console.log("获取需要清理的文件");
    const files = new Promise((resolve, reject) => {
      fs.readdir("./public/sources/images/", (err, res) => {
        resolve([err, res]);
      });
    });

    const db = query("SELECT cover FROM classify UNION SELECT imgs FROM article");

    Promise.all([files, db]).then(([res1, res2]) => {
      let [err1, files] = res1;
      let [err2, data] = res2;
      // if (!err1 && !err2) {
      //   let temp = [];
      //   data.forEach((item) => {
      //     if (item.imgs) {
      //       try {
      //         temp.push(JSON.parse(item.imgs));
      //       } catch (error) {}
      //     }
      //   });
      //   data = temp.flat(2);
      //   let a = 0;
      //   files.forEach((item,index) => {
      //     console.log(`检查文件：${index+1}/${data.length}`);
      //     if (!data.includes(item)) {
      //       fs.unlink(`./${configPath.img}/${item}`, (err) => {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           console.log(`已删除 ${configPath.img}/${item}`);
      //         }
      //       });
      //     }
      //   });

      //   console.log('清理文件完成');
      // }
    });
  },
};
