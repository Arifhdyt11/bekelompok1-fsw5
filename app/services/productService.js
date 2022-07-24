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
    const data = await productRepository.findById(id);
    if (!data) {
      throw new Error("Product not found");
    }
    try {
      return data;
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
    const data = await productRepository.findBySellerId(id, sellerId);
    if (!data) {
      throw new Error("Product not found");
    }
    try {
      return data;
    } catch (err) {
      throw err;
    }
  },

  async update(productId, sellerId, requestBody, reqFiles) {
    const oldImage = requestBody.oldImage;
    const fileBase64 = [];
    const file = [];
    const newImage = [];

    // Delete Image from Cloudinary
    if (oldImage) {
      if (Array.isArray(oldImage)) {
        for (var x = 0; x < oldImage.length; x++) {
          cloudinaryDestroy(oldImage[x]);
        }
      } else {
        cloudinaryDestroy(oldImage);
      }
    }

    // Upload New Image to Cloudinary
    const image = requestBody.image;
    if (image) {
      if (Array.isArray(image)) {
        for (var x = 0; x < image.length; x++) {
          newImage.push(image[x]);
        }
      } else {
        newImage.push(image);
      }
    }

    if (reqFiles) {
      if (reqFiles.length > 0) {
        for (var i = 0; i < reqFiles.length; i++) {
          fileBase64.push(reqFiles[i].buffer.toString("base64"));
          file.push(`data:${reqFiles[i].mimetype};base64,${fileBase64[i]}`);
          const result = await cloudinaryUpload(file[i]);
          newImage.push(result.secure_url);
        }
      }
    }

    const productUpdated = await productRepository.update(productId, {
      ...requestBody,
      image: newImage,
    });
    if (!productUpdated) {
      throw new Error("Failed to update product");
    }
    try {
      return await productRepository.findBySellerId(productId, sellerId);
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

  async create(requestBody, sellerId, requestFile) {
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
      image.push(
        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
      );
    }
    const productCreated = await productRepository.create({
      ...requestBody,
      userId: userTokenId,
      image: image,
    });
    try {
      return await productRepository.findByIdCreate(productCreated.id);
    } catch (err) {
      throw err;
    }
  },
};
