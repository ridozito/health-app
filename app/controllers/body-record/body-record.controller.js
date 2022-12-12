const BodyRecordService = require("../../services/body_record.service");
module.exports = {
  get: async ctx => {
    const user = ctx.state.user;
    const data = await BodyRecordService.get(user.id, ctx.query.type);
    return ctx.res.ok({ data });
  },
};
