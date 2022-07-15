const { Transaction, ProductSize, Product, User, Category, Size } = require("../models");

module.exports = {
  findAll() {
    return Transaction.findAll();
  },

  find(id) {
    return Transaction.findOne({
      where: {
        id: id,
      },
    });
  },

  findByBuyer(id) {
    try {
      const data = Transaction.findAll({
        include: [
          { 
            model: ProductSize,
            as: "productSizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "userAsSeller",
                    attributes: [
                      "id",
                      "role",
                      "name",
                      "city",
                      "address",
                      "phone",
                      "image",
                    ],
                  },
                  {
                    model: Category,
                    as: "categories",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Size,
                as: "sizes",
                attributes: ["size"],
              },
            ],
          },
          {
            model: User,
            as: "userAsBuyer",
            where: {
              id: id,
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
        where: {'$productSizes.products.userAsSeller.id$': id},
        include: [
          {
            model: ProductSize,
            as: "productSizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "userAsSeller",
                    attributes: [],
                  },
                  {
                    model: Category,
                    as: "categories",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Size,
                as: "sizes",
                attributes: ["size"],
              },
            ],  
          },
          {
            model: User,
            as: "userAsBuyer",
            attributes: [
              "id",
              "role",
              "name",
              "city",
              "address",
              "phone",
              "image",
            ],
          }
        ],
        attributes: [
          "id",
          "status",
          "priceBid",
          "createdAt",
          "updatedAt",
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findDetailByBuyer(userId, id){
    try {
      const data = Transaction.findOne({
        include: [
          { 
            model: ProductSize,
            as: "productSizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "userAsSeller",
                    attributes: [
                      "id",
                      "role",
                      "name",
                      "city",
                      "address",
                      "phone",
                      "image",
                    ],
                  },
                  {
                    model: Category,
                    as: "categories",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Size,
                as: "sizes",
                attributes: ["size"],
              },
            ],
          },
          {
            model: User,
            as: "userAsBuyer",
            where: {
              id: userId,
            },
            attributes: [ "id", "role", "name", ],
          }
        ],
        where: {
          id: id,
        },
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findDetailBySeller(userId, id){
    try {
      const data = Transaction.findAll({
        include: [
          {
            model: ProductSize,
            as: "productSizes",
            include: [
              {
                model: Product,
                as: "products",
                include: [
                  {
                    model: User,
                    as: "userAsSeller",
                    where: {
                      id: userId,
                    },
                    attributes: [ "id", "role", "name", ],
                  },
                  {
                    model: Category,
                    as: "categories",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Size,
                as: "sizes",
                attributes: ["size"],
              },
            ],
          },
          {
            model: User,
            as: "userAsBuyer",
            attributes: [
              "id",
              "role",
              "name",
              "city",
              "address",
              "phone",
              "image",
            ],
          }
        ],
        where: {
          id: id,
        },
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findProductByUser(userId, productsizeId) {
    try {
      const data = Transaction.findOne({
        where: {
          userId: userId,
          productsizeId: productsizeId,
          status: "pending",
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
  },

  delete(id) {
    return Transaction.destroy({
      where: {
        id,
      },
    });
  },
};