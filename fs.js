const { readFile } = require("fs/promises");

const template = {
  ipc: {
    text: "京ICP备10036305号-7",
    link: "",
  },
  menu: [],
  about: "",
};

readFile("./utils/blog_config.json", {
  encoding: "utf-8",
}).then((res) => {
  console.log(res);
});
