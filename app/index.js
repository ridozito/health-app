"use strict";

const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-body");
const Sequelize = require("sequelize");
const config = require("./config");
const responseHandler = require("./common/response_handler");

const app = new Koa();
global.__sequelizeMySQL = new Sequelize(config.database.mysql.name, config.database.mysql.username, config.database.mysql.password, {
  dialect: "mysql",
  port: config.database.mysql.port || 3306,
  host: config.database.mysql.host,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
    evict: 10000,
  },
  timezone: config.database.mysql.timezone,
  logging: false,
  query: { raw: true },
});

app.use(cors());
app.use(
  bodyParser({
    multipart: true,
    jsonLimit: "50mb",
    limit: "50mb",
    parsedMethods: ["GET", "HEAD", "DELETE", "POST", "PATCH", "PUT"],
  })
);
app.use(responseHandler());

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      return ctx.res.notFound();
    }
  } catch (err) {
    console.log("error",err);
    return ctx.res.internalServerError({ message: err.message });
  }
});



// Load modules
const controllers = require("./controllers");
controllers(app);

const server = app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`);
});

module.exports = server;
