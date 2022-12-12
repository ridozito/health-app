const models = require("../models");
const MealHistory = models.meal_history;
const AppConst = require("../common/app.const");
const Op = models.Sequelize.Op;
const moment = require("moment");

module.exports = {
  get: async user_id => {
    if (user_id) {
      return await MealHistory.findAll({
        where: {
          user_id,
          created_date: {
            [Op.between]: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
          },
        },
      });
    } else {
      return await MealHistory.findAll({
        limit: 10,
        offset: 0,
      });
    }
  },
};
