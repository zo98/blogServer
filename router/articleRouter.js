const Router = require("koa-router");
const router = new Router();
const { getArticle } = require("../service/articleService");
router.prefix("/api/article");

router.get("/getArticle", async (ctx, next) => {
  ctx.body = await getArticle(ctx.query);
});

module.exports = router;
