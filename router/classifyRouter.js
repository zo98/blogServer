// 分类
const Router = require("koa-router");
const router = new Router();
const {
  getClassify,
  updateClassify,
  deleteClassify,
} = require("../service/classifyService");

router.prefix("/api/classify");

router.get("/getClassify", async (ctx, next) => {
  ctx.body = await getClassify(ctx.query);
});

router.post("/updateClassify", async (ctx, next) => {
  ctx.body = await updateClassify(ctx.request.body);
});

router.post("/deleteClassify", async (ctx, next) => {
  ctx.body = await deleteClassify(ctx.request.body);
});

module.exports = router;
