const { getByUserId } = require("../app/services/transactionService");
const transactionService = require("../app/services/transactionService");
const transactionController = require("../app/controllers/api/v1/transactionController");

const getByBuyer = async (req, res, buyerId) => {
  try {
    const data = await transactionService.getByBuyer(buyerId);
    // console.log(data);
    if (data !== null) {
      return await transactionController.listByBuyer(req, res, buyerId);
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
    const data = await transactionService.getBySeller(sellerId);
    if (data !== null) {
      return await transacController.listBySeller(req, res, sellerId);
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
      const productSizeId = await transactionService.getProductByUser(
        req.user.id,
        req.body.productsizeId
      );

      if (productSizeId) {
        res.status(422).json({
          status: false,
          message: "Product was already in transaction",
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
