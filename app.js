const Koa = require("koa");
const app = new Koa();
// const cors = require("koa2-cors");
const koa_body = require("koa-body");
const articleRouter = require("./router/articleRouter");
const classifyRouter = require("./router/classifyRouter");
const userRouter = require("./router/userRouter");

// 跨域
// app.use(cors());

app.use(koa_body());

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

// app.use(index.routes(), index.allowedMethods());
app.use(articleRouter.routes(), articleRouter.allowedMethods());
app.use(classifyRouter.routes(), classifyRouter.allowedMethods());
app.use(userRouter.routes(), userRouter.allowedMethods());

app.listen(8000);
