// 分类
const Router = require("koa-router");
const router = new Router();
const { getClassify } = require("../service/classifyService");

router.prefix("/api/classify");

router.get("/getClassify", async (ctx, next) => {
  console.log("query", ctx.query);
  ctx.body = await getClassify(ctx.query);
});

module.exports = router;
