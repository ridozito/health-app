"use strict";

const jwt = require("jsonwebtoken");
const config = require("../config");
const UserService = require("../services/users.service");
async function isAuthenticated(ctx, next) {
  if (ctx.request.header.authorization && ctx.request.header.authorization.split(" ")[0] === "Bearer") {
    const token = ctx.request.header.authorization.split(" ")[1];
    if (token) {
      try {
        const payload = jwt.verify(token, config.secret, { complete: false });
        let user = await UserService.findById(payload.sub);
        if(!user)  return ctx.res.unauthorized({ message: "Unauthorized" });
        ctx.state.user = user;
      } catch (err) {
        console.log(err);
        return ctx.res.unauthorized({ message: "Unauthorized" });
      }

      return await next();
    }
  }
  return ctx.res.unauthorized({ message: "Unauthorized" });
}

module.exports = {
  isAuthenticated,
};
