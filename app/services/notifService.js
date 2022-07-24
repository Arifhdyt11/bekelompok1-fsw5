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

  async create(transactionId) {
    try {
      return await notifRepository.create({
        transactionId,
        isReadBuyer: false,
        isReadSeller: false,
        message: "You have new transaction",
      });
    } catch (err) {
      throw err;
    }
  },

  async updateStatusTransaction(transactionId, status) {
    try {
      return await notifRepository.create({
        transactionId,
        isReadBuyer: false,
        isReadSeller: false,
        message: "Transaction has been " + status,
      });
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

  async updateAllBuyer() {
    try {
      return await notifRepository.updateAllBuyer();
    } catch (err) {
      throw err;
    }
  },

  async updateAllSeller() {
    try {
      return await notifRepository.updateAllSeller();
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
