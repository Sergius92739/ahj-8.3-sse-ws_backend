const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const report = require('./api/Report')

const app = new Koa();
const port = process.env.PORT || 7070;

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));
app.use(cors());
app.use(router());

const server = http.createServer(app.callback());
server.listen(port);
report.start();
console.log(`server is started on port ${port}`);
