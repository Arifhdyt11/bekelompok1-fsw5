const categoryRepository = require("../repositories/categoryRepository");

module.exports = {
  async list() {
    try {
      return await categoryRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    const category = await categoryRepository.find(id);
    if (category == null) {
      throw new Error("Category not found");
    }
    try {
      return category;
    } catch (err) {
      throw err;
    }
  },

  async create(requestBody) {
    try {
      return await categoryRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  },

  async update(id, requestBody) {
    try {
      return await categoryRepository.update(id, requestBody);
    } catch (err) {
      throw err;
    }
  },

  async delete(id) {
    try {
      return await categoryRepository.delete(id);
    } catch (err) {
      throw err;
    }
  },
};
