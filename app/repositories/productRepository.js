const { Product, Category, User } = require("../models");

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
