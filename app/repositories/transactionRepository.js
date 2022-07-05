const { Transaction, ProductSize, Product, User } = require("../models");

module.exports = {
  findAll() {
    return Transaction.findAll();
  },

  findByBuyer(id) {
    try {
      const data = Transaction.findAll({
        include: [
          { 
            model: ProductSize,
            as: "productsizes",
            include: [
              {
                model: Product,
                as: "products",
              },
            ],
          },
          {
            model: User,
            as: "userAsBuyer",
            where: {
              userId: id,
            },
            attributes: [ "id", "role", "name", ],
          }
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findBySeller(id) {
    try {
      const data = Transaction.findAll({
        include: [
          {
            model: ProductSize,
            as: "productsizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "userAsSeller",
                    where: {
                      userId: id,
                    },
                  },
                ],
              },
            ],  
          },
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findProductByUser(userId, productId) {
    try {
      const data = Transaction.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  create(createArgs) {
    return Transaction.create(createArgs);
  },

  update(id, updateArgs) {
    return Transaction.update(updateArgs, {
      where: {
        id,
      },
    });
  }
};