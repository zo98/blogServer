const Router = require("koa-router");
const router = new Router();
const { login } = require("../service/userService");
router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  ctx.body = await login(ctx.request.body);
});

module.exports = router;
