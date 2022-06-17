const productRepository = require("../repositories/productRepository");

module.exports = {
  async list() {
    try {
      return await productRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await productRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await productRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await productRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await productRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
