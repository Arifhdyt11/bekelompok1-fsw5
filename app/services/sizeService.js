const sizeRepository = require("../repositories/sizeRepository");

module.exports = {
  async list() {
    try {
      return await sizeRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await sizeRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await sizeRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await sizeRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await sizeRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};