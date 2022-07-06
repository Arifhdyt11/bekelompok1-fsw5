const productService = require("../../../services/productService");
const { promisify } = require("util");
const cloudinary = require("../../../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
  async list(req, res) {
    try {
      const data = await productService.list();
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await productService.listBySeller(req.user.id);
      console.log(data);
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const { name, price, categoryId, description } = req.body;
      const userTokenId = req.user.id;
      const image = [];
      const fileBase64 = [];
      const file = [];

      for (var i = 0; i < req.files.length; i++) {
        fileBase64.push(req.files[i].buffer.toString("base64"));
        file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
        const result = await cloudinaryUpload(file[i]);
        image.push(result.secure_url);
      }

      productService
        .create({
          userId: userTokenId,
          name,
          price,
          categoryId,
          description,
          image,
        })
        .then((product) => {
          res.status(201).json({
            status: true,
            product,
          });
        });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const data = await productService.get(req.params.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await productService.getBySellerId(
        req.params.id,
        req.user.id
      );
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const oldImage = req.body.oldImage;
      const fileBase64 = [];
      const file = [];
      const image = [];
      console.log("old image : ", oldImage.length);
      let updateArgs = {
        ...req.body,
      };
      let productId = req.params.id;

      const dataUpdated = await productService.get(productId);

      // Delete Image from Cloudinary
      if (oldImage !== undefined) {
        if (Array.isArray(oldImage)) {
          // Kalo bentuknya array
          for (var x = 0; x < oldImage.length; x++) {
            cloudinaryDestroy(oldImage[x]);
          }
        } else {
          // Kalo bentuknya string cuma 1 image
          cloudinaryDestroy(oldImage);
        }
      }
      // Upload New Image to Cloudinary
      if (req.files.length > 0) {
        for (var i = 0; i < req.files.length; i++) {
          fileBase64.push(req.files[i].buffer.toString("base64"));
          file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
          const result = await cloudinaryUpload(file[i]);
          image.push(result.secure_url);
        }
      }
      updateArgs = { ...updateArgs, image };
      await productService.update(productId, updateArgs);
      res.status(200).json({
        status: true,
        message: "Product has been updated!",
        data: dataUpdated,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      await productService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Product has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
