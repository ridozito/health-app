const MealHistoryService = require("../../services/meal_history.service");
module.exports = {
  get: async ctx => {
    const user = ctx.state.user;
    const data = await MealHistoryService.get(user.id);
    return ctx.res.ok({ data });
  },
};
