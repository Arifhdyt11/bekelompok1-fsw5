const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async list() {
    try {
      return await transactionRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await transactionRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await transactionRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await transactionRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await transactionRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
