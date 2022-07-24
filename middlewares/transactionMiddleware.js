const transactionService = require("../app/services/transactionService");

module.exports = {
  async getProductByUser(req, res, next) {
    try {
      data = await transactionService.getProductByUser(
        req.user.id,
        req.body.productsizeId
      );
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
