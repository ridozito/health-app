const models= require("../models");
const Users = models.users;

module.exports = {
  findById: async (id) => {
    return await Users.findByPk(id);
  },
};
