const { User } = require("../models");

module.exports = {
  findAll() {
    return User.findAll();
  },
  find(id) {
    return User.findOne({
      where: {
        id: id,
      },
    });
  },

  findWhoami(accessToken) {
    return User.findOne({
      where: {
        accessToken: accessToken,
      },
    });
  },

  findByEmail(email){
    return User.findOne({
      where: {
        email: email,
      }
    })
  },
  create(createArgs) {
    return User.create(createArgs);
  },
  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
  },
  delete(id) {
    return User.destroy({
      where: {
        id,
      },
    });
  },
};
