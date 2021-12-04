const Router = require("koa-router");
const router = new Router();
const { getBlogData } = require("../service/indexService");
router.prefix("/api");
router.get("/blogdata", async (ctx, next) => {
  ctx.body = await getBlogData(ctx.query);
});
router.get("/check", async (ctx, next) => {
  ctx.body = { msg: "ok" };
});
module.exports = router;
