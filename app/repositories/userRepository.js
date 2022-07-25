const { User } = require("../models");

module.exports = {
  async findUser(id) {
    try {
      return await User.findOne({
        where: {
          id: id,
        },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
    } catch (error) {
      return error;
    }
  },

  async findByEmail(email) {
    try {
      return await User.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async findByGoogleId(googleId) {
    try {
      return await User.findOne({
        where: {
          googleId: googleId,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async create(createArgs) {
    try {
      return await User.create(createArgs);
    } catch (error) {
      return error;
    }
  },

  async update(id, updateArgs) {
    try {
      return await User.update(updateArgs, {
        where: {
          id,
        },
        individualHooks: true,
      });
    } catch (error) {
      return error;
    }
  },

  async delete(email) {
    try {
      return await User.destroy({
        where: {
          email,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
