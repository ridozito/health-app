const models = require("../models");
const ExcerciseHistory = models.excercise_history;
const AppConst = require("../common/app.const");
const Op = models.Sequelize.Op;
const moment = require("moment");

module.exports = {
  get: async (user_id) => {
    return await ExcerciseHistory.findAll({
      where: {
        user_id,
        created_date: {
          [Op.between]: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
        },
      },
    });
  },
};
