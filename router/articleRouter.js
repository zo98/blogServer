const Router = require("koa-router");
const router = new Router();
const {
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleByClassify,
} = require("../service/articleService");
router.prefix("/api/article");

router.get("/getArticle", async (ctx, next) => {
  ctx.body = await getArticle(ctx.query);
});

router.post("/updateArticle", async (ctx, next) => {
  const token = ctx.request.header.authorization.split(" ")[1];
  ctx.body = await updateArticle({ token, ...ctx.request.body });
});
router.post("/deleteArticle", async (ctx, next) => {
  ctx.body = await deleteArticle(ctx.request.body);
});

router.get("/getArticleByClassify", async (ctx, next) => {
  ctx.body = await getArticleByClassify(ctx.query);
});

module.exports = router;
