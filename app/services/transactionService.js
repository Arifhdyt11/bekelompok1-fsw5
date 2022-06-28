const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async getByBuyer(buyerId) {
    try {
      return await transactionRepository.findByBuyer(buyerId);
    } catch (err) {
      throw err;
    }
  },

  async getBySeller(sellerId) {
    try {
      return await transactionRepository.findBySeller(sellerId);
    } catch (err) {
      throw err;
    }
  },

  async getProductByUser(userId, productId) {
    try {
      return await transactionRepository.findProductByUser(userId, productId);
    } catch (err) {
      throw err;
    }
  },

  async create(createArgs) {
    try {
      return await transactionRepository.create(createArgs);
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
