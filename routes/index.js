const combineRouters = require('koa-combine-routers');
const ping = require('./ping');
const sseRouter = require('./sse');

const router = combineRouters(
  ping,
  sseRouter,
);

module.exports = router;
