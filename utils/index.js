const { configPath } = require("../config/index");
module.exports = {
  isValid(val) {
    if (val) {
      return /^\S+$/g.test(val);
    }
    return false;
  },
  /**
   *
   * @param {string} path - 路径
   * @returns 图片名
   */
  replaceImgPathToName(path) {
    if (!path) {
      return "";
    }
    const reg = new RegExp(`/${configPath.source}/`);
    return path.replace(reg, "");
  },
  replaceNameToPath(name) {
    if (name) {
      return `/${configPath.source}/${name}`;
    }
    return "";
  },
};
