const Router = require("koa-router");
const router = new Router();
const { upLoadImg } = require("../service/upLoadService");
router.prefix("/api/upload");

router.post("/uploadimg", async (ctx, next) => {
  ctx.body = await upLoadImg(ctx.req, ctx.res);
});

module.exports = router;
