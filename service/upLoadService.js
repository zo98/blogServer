const { uploadFiles } = require("../utils/upLoadFiles");
module.exports = {
  async upLoadImg(req, res) {
    const result = uploadFiles({
      path: "./public/temp/img",
      key: "file",
      size: 5120,
    });

    const [files, err] = await new Promise((resolve, reject) => {
      result(req, res, (err) => {
        resolve([req.files, err]);
      });
    });
    if (err) {
      return { code: 0, msg: err };
    } else {
      const records = files.map((item) => item.filename);
      return { code: 1, data: { records }, msg: "success" };
    }
  },
};
