const models = require("../models");
const BodyRecord = models.body_record;
const AppConst = require("../common/app.const");
const Op = models.Sequelize.Op;
const moment = require("moment");

module.exports = {
  get: async ( user_id, type ) => {
    switch (type) {
      case AppConst.BODY_RECORD_TYPE.WEEK:
        return await BodyRecord.findAll({
          where: {
            user_id,
            created_date: {
              [Op.between]: [moment().startOf("week").toDate(), moment().endOf("week").toDate()],
            },
          },
        });
      case AppConst.BODY_RECORD_TYPE.MONTH:
        return await BodyRecord.findAll({
          where: {
            user_id,
            created_date: {
              [Op.between]: [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
            },
          },
        });
      case AppConst.BODY_RECORD_TYPE.YEAR:
        return await BodyRecord.findAll({
          where: {
            user_id,
            created_date: {
              [Op.between]: [moment().startOf("year").toDate(), moment().endOf("year").toDate()],
            },
          },
        });
      default:
        return await BodyRecord.findAll({
          where: {
            user_id,
            created_date: {
              [Op.between]: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
            },
          },
        });
    }
  },
};
