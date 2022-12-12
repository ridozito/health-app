const DiaryService = require("../../services/excercise_history.service");
module.exports = {
  get: async ctx => {
    let promiseAll = [];
    const user = ctx.state.user;
    const data = await DiaryService.get(user.id);
    return ctx.res.ok({ data});
  },
};
