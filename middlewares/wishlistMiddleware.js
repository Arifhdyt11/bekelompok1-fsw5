const wishlistService = require("../app/services/wishlistService");
const wishlistController = require("../app/controllers/api/v1/wishlistController");

const getByBuyer = async (req, res, buyerId) => {
  try {
    const data = await wishlistService.getByBuyer(buyerId);
    if (data !== null) {
      return await wishlistController.listByBuyer(req, res, buyerId);
    } else {
      res.status(404).json({
        status: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const getBySeller = async (req, res, sellerId) => {
  try {
    const data = await wishlistService.getBySeller(sellerId);
    if (data !== null) {
      return await wishlistController.listBySeller(req, res, sellerId);
    } else {
      res.status(404).json({
        status: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  async getProductByUser(req, res, next) {
    try {
      const sizeId = await wishlistService.getProductByUser(
        req.body.userId,
        req.body.productId
      );

      if (sizeId) {
        res.status(422).json({
          status: false,
          message: "Product already in wishlist",
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async getByRole(req, res, next) {
    try {
      if (req.user.role === "BUYER") {
        await getByBuyer(req, res, req.user.id);
        // next();
      } else if (req.user.role === "SELLER") {
        await getBySeller(req, res, req.user.id);
        // next();
      } else {
        res.status(400).json({
          status: false,
          message: "User is not a buyer or seller",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
