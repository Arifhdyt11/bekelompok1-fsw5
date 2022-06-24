const { Product, Category, User, Size } = require("../models");

module.exports = {
  findAll() {
    try {
      const data = Product.findAll({
        include: [{ 
          model: Category, 
          attributes: ["name"] 
        }, 
        { 
          model: User,
          attributes: ["role", "name", "email", "city", "address", "phone"] 
        },
        {
          model: Size,
          attributes: ["size", "stock"]
        }],
    });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    } 
  },

  findBySeller(sellerId) {
    try {
      const data = Product.findAll({
        include: [{
          model: User,
          attributes: ["role", "name", "email", "city", "address", "phone"],
          where: {
            id: sellerId,
          },
        }],
      });
        
      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  find(id) {
    return Product.findOne({
      where: {
        id: id,
      },
    });
  },

  create(createArgs) {
    return Product.create(createArgs);
  },

  update(id, updateArgs) {
    return Product.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Product.destroy({
      where: {
        id,
      },
    });
  },
};
