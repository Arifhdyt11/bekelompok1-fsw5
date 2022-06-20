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

  findWhoami(id) {
    return User.findOne({
      where: {
        id: id,
      },
      attributes: ['role', 'name', 'email', 'city', 'address', 'phone'],
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
