const fs = require("fs");
const path = require("path");

function mkdirsSync(dirname) {
  try {
    fs.accessSync(dirname, fs.constants.F_OK);
    return true;
  } catch (error) {
    if (mkdirsSync(path.dirname(dirname))) {
      console.log(path.dirname(dirname));
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

mkdirsSync("./hello");
