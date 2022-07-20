const notifRepository = require("../repositories/notifRepository");

module.exports = {
  async list() {
    try {
      return await notifRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async getAllByBuyer(id) {
    try {
      return await notifRepository.findByBuyer(id);
    } catch (err) {
      throw err;
    }
  },

  async getAllBySeller(id) {
    try {
      return await notifRepository.findBySeller(id);
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await notifRepository.find(id);
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await notifRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await notifRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await notifRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
