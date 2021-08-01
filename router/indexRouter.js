const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
router.prefix("/");
router.get("/", async (ctx, next) => {
  ctx.type = "text/html;charset=utf-8";
  ctx.body = fs.readFileSync(__dirname + "/../public/index.html");
});
module.exports = router;
