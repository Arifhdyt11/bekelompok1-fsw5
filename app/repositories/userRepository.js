const { User } = require("../models");

module.exports = {
  findAll() {
    return User.findAll();
  },

  findUser(id) {
    return User.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
  },

  findByEmail(email) {
    return User.findOne({
      where: {
        email: email,
      },
    });
  },

  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
      individualHooks: true,
    });
  },
};
