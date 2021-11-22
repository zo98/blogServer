const Router = require("koa-router");
const router = new Router();
const { getSystemInfo, updateSystemInfo } = require("../service/systemService");
router.prefix("/api/system");

router.post("/update", async (ctx, next) => {
  ctx.body = await updateSystemInfo(ctx.request.body);
});
router.get("/getInfo", async (ctx, next) => {
  ctx.body = await getSystemInfo();
});

module.exports = router;
