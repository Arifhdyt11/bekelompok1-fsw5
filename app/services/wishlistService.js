const wishlistRepository = require("../repositories/wishlistRepository");

module.exports = {
  async list() {
    try {
      return await wishlistRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await wishlistRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async getProductByUser(userId, productId) {
    try {
      return await wishlistRepository.findProductByUser(userId, productId);
    } catch (err) {
      throw err;
    }
  },

  async create(createArgs) {
    try {
      return await wishlistRepository.create(createArgs);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await wishlistRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await wishlistRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
