const transactionRepository = require("../repositories/transactionRepository");
const sizeService = require("./sizeService");

module.exports = {
  async getAllByBuyer(id) {
    const data = await transactionRepository.findByBuyer(id);
    if (!data) {
      throw new Error("Data not found");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getAllBySeller(id) {
    const data = await transactionRepository.findBySeller(id);
    if (!data) {
      throw new Error("Data not found");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getDetailByBuyer(userId, id) {
    const data = await transactionRepository.findDetailByBuyer(userId, id);
    if (!data) {
      throw new Error("Data not found");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getDetailBySeller(userId, id) {
    const data = await transactionRepository.findDetailBySeller(userId, id);
    if (!data) {
      throw new Error("Data not found");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getDetailOneBySeller(userId, id) {
    try {
      return await transactionRepository.findOneBySeller(userId, id);
    } catch (err) {
      throw err;
    }
  },

  async getProductByUser(userId, productsizeId) {
    const data = await transactionRepository.findProductByUser(
      userId,
      productsizeId
    );
    if (data) {
      throw new Error("Product was already in transaction");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async create(createArgs, userId) {
    try {
      const data = await transactionRepository.create({
        ...createArgs,
        userId,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return await transactionRepository.find(data.id);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      await transactionRepository.update(id, {
        status: requestBody.status,
      });
      let updatedStatus = await transactionRepository.get(id);
      let dataStock = await sizeService.get(updatedStatus.productsizeId);
      if (
        !updatedStatus.status === "process" ||
        !updatedStatus.status === "cancel"
      ) {
        return updatedStatus;
      }

      // stock
      let stock = dataStock.stock;
      let newStock = 0;
      if (updatedStatus.status === "process") {
        newStock = stock - 1;
      } else if (updatedStatus.status === "cancel") {
        newStock = stock + 1;
      }
      await sizeService.update(dataStock.id, {
        stock: newStock,
      });
      return updatedStatus;
    } catch (error) {
      throw error;
    }
  },
};
