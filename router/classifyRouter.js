// 分类
const Router = require("koa-router");
const router = new Router();
const {
  getClassify,
  updateClassify,
  deleteClassify,
  getHotClassify,
} = require("../service/classifyService");
const { uploadClove } = require("../service/upLoadService");

router.prefix("/api/classify");

router.get("/getClassify", async (ctx, next) => {
  ctx.body = await getClassify(ctx.query);
});

router.post("/updateClassify", async (ctx, next) => {
  ctx.body = ctx.request.body;
  // ctx.body = await updateClassify(ctx.request.body);
});

router.post("/deleteClassify", async (ctx, next) => {
  ctx.body = await deleteClassify(ctx.request.body);
});

router.get("/hotClassify", async (ctx, next) => {
  ctx.body = await getHotClassify(ctx.query);
});
router.post("/uploadimg", async (ctx, next) => {
  ctx.body = await uploadClove(ctx.req, ctx.res, ctx.request.host);
});

module.exports = router;
