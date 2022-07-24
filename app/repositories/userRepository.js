const { User } = require("../models");

module.exports = {
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

  findByGoogleId(googleId) {
    return User.findOne({
      where: {
        googleId: googleId,
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

  delete(email) {
    return User.destroy({
      where: {
        email,
      },
    });
  },
};
