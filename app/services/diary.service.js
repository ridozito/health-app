const models = require("../models");
const Diary = models.diary;
const Op = models.Sequelize.Op;
const moment = require("moment");

module.exports = {
  get: async (user_id) => {
    return await Diary.findAll({
      where: {
        user_id,
        created_date: {
          [Op.between]: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
        },
      },
    });
  },
};
