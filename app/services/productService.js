const productRepository = require("../repositories/productRepository");
const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
  async list() {
    try {
      return await productRepository.findAll();
    } catch (err) {
      throw err;
    }
  },

  async listBySeller(sellerId) {
    try {
      return await productRepository.findBySeller(sellerId);
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
    try {
      return await productRepository.findById(id);
    } catch (err) {
      throw err;
    }
  },

  async getCreateData(id) {
    try {
      return await productRepository.findByIdCreate(id);
    } catch (err) {
      throw err;
    }
  },

  async getBySellerId(id, sellerId) {
    try {
      return await productRepository.findBySellerId(id, sellerId);
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

  async handleCreateProduct(requestBody, sellerId, requestFile) {
    try {
      const { name, price, categoryId, description, status } = requestBody;
      const userTokenId = sellerId;
      const image = [];
      const fileBase64 = [];
      const file = [];

      for (var i = 0; i < requestFile.length; i++) {
        fileBase64.push(requestFile[i].buffer.toString("base64"));
        file.push(`data:${requestFile[i].mimetype};base64,${fileBase64[i]}`);
        const result = await cloudinaryUpload(file[i]);
        image.push(result.secure_url);
      }

      //kalo image kosong masukin placholder
      if (image.length === 0) {
        image.push("https://pricesm.com/uploads/placeholder.png");
      }
      const productCreated = await productRepository.create({
        userId: userTokenId,
        name,
        price,
        categoryId,
        description,
        image,
        status,
      });
      return await productRepository.findByIdCreate(productCreated.id);
    } catch (err) {
      throw err;
    }
  },
};
