const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async list(req, res) {
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

  async getDetailByBuyer(userId, id){
    try {
      return await transactionRepository.findDetailByBuyer(userId, id);
    } catch (err) {
      throw err;
    }
  },

  async getDetailBySeller(userId, id){
    try {
      return await transactionRepository.findDetailBySeller(userId, id);
    } catch (err) {
      throw err;
    }
  },

  async getProductByUser(userId, productsizeId) {
    try {
      return await transactionRepository.findProductByUser(userId, productsizeId);
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