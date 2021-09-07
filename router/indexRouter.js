const Router = require("koa-router");
const router = new Router();
const { getBlogData } = require("../service/indexService");
router.prefix("/api");
router.get("/blogdata", async (ctx, next) => {
  ctx.body = await getBlogData(ctx.query);
});
module.exports = router;
