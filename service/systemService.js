const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");

module.exports = {
  async getSystemInfo() {
    try {
      const res = await readFile(
        join(__dirname, "../config/blog_config.json"),
        {
          encoding: "utf-8",
        }
      );
      data = JSON.parse(res);
      return { code: 1, data };
    } catch (error) {
      return { code: 0, msg: error };
    }
  },
  async updateSystemInfo(data) {
    try {
      const res = await writeFile(
        join(__dirname, "../config/blog_config.json"),
        JSON.stringify(data),
        {
          encoding: "utf8",
        }
      );
      return { code: 1, msg: res };
    } catch (error) {
      return { code: 0, msg: error };
    }
  },
};
