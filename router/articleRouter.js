const Router = require("koa-router");
const router = new Router();
const { getArticle } = require("../service/articleService");
router.prefix("/api/article");

router.get("/getArticle", async (ctx, next) => {
  ctx.body = await getArticle(ctx.query);
});

router.post("/updateArticle", async (ctx, next) => {
  const token = ctx.request.header.authorization.split(" ")[1];
  ctx.body = token;
});

module.exports = router;
