const { updateToken } = require("../repositories/userRepository");
const userRepository = require("../repositories/userRepository");

module.exports = {
  async list() {
    try {
      return await userRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await userRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async getByEmail(email) {
    try {
      return await userRepository.findByEmail(email);
    } catch (err) {
      throw err;
    }
  },

  async getCurrentUser(id) {
    try {
      return await userRepository.findWhoami(id);
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await userRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await userRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await userRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
