const Koa = require("koa");
const path = require("path");
const app = new Koa();
// const cors = require("koa2-cors");
const koa_body = require("koa-body");
const articleRouter = require("./router/articleRouter");
const classifyRouter = require("./router/classifyRouter");
const userRouter = require("./router/userRouter");
const upLoadRouter = require("./router/upLoadRouter");
const indexRouter = require("./router/indexRouter");
const systemRouter = require("./router/systemRouter");
const staticServer = require("koa-static");
const { verifyToken } = require("./utils/verifyToken");
require("./auto_service/index");
// 跨域
// app.use(cors());

app.use(koa_body());
app.use(verifyToken);

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(articleRouter.routes(), articleRouter.allowedMethods());
app.use(classifyRouter.routes(), classifyRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(upLoadRouter.routes(), upLoadRouter.allowedMethods());
app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(systemRouter.routes(), systemRouter.allowedMethods());
app.use(staticServer(path.join(__dirname, "public")));
app.listen(8000);
