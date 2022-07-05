const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async list(req, res) {
    try {
      return await transactionRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async getAllByBuyer(id) {
    try {
      return await transactionRepository.findByBuyer(id);
    } catch (err) {
      throw err;
    }
  },

  async getAllBySeller(id) {
    try {
      return await transactionRepository.findBySeller(id);
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
};