const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const router = new Router();
const report = require('../api/Report');

router.get('/sse', async (ctx) => {
  let index = 0;
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      const idx = report.comments.findIndex((elem) => elem.id === lastEventId) + 1;
      index = report.comments.length;
      if (idx < index) {
        return report.comments.slice(idx);
      }
      return [];
    },
    stream(sse) {
      const interval = setInterval(() => {
        if (index < report.comments.length) {
          sse.sendEvent(report.comments[index]);
          index += 1;
        }
      }, 500);

      return () => clearInterval(interval);
    }
  });

  ctx.respond = false;
});

module.exports = router;
