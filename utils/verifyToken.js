// 验证token
const jsonwebtoken = require("jsonwebtoken");
const { SECRET } = require("../config/index");
const excludePath = [
  /\/api\/article\/getArticle/,
  /\/api\/article\/getArticleByClassify/,
  /\/api\/classify\/getClassify/,
  /\/api\/classify\/getClassify/,
  /\/api\/blogdata/,
  /\/api\/user\/login/,
  /\/sources/,
];
module.exports = {
  async verifyToken(ctx, next) {
    // console.log("test", ctx, next);
    const verify = excludePath.some((item) => {
      return item.test(ctx.request.url);
    });
    console.log("url",ctx.request.url,"verify", verify);
    if (verify) {
      return await next();
    }
    const token = ctx.request.header.authorization.split(" ")[1];
    if (token) {
      try {
        const user = jsonwebtoken.verify(token, SECRET);
        return await next()
      } catch (error) {
        ctx.response.status = 401;
        return
      }
    }
    ctx.response.status = 401;
    return
  },
};
