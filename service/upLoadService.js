const { uploadFiles } = require("../utils/upLoadFiles");
const { configPath, serverHost } = require("../config/index");

module.exports = {
  async upLoadImg(req, res, host) {
    const result = uploadFiles({
      path: "./" + configPath.img,
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
      if (records.length === 1) {
        return {
          location: `http://${host}/${configPath.source}/${records[0]}`,
        };
      }
      return { code: 1, data: { records }, msg: "success" };
    }
  },
};
