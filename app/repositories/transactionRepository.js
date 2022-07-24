const {
  Transaction,
  ProductSize,
  Product,
  User,
  Category,
  Size,
} = require("../models");

module.exports = {
  async find(id) {
    return await Transaction.findOne({
      where: {
        id: id,
      },
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
          attributes: ["id", "role", "name"],
        },
      ],
    });
  },

  async findByBuyer(id) {
    try {
      return await Transaction.findAll({
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
            attributes: ["id", "role", "name"],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },

  async findBySeller(id) {
    try {
      return await Transaction.findAll({
        where: { "$productSizes.products.userAsSeller.id$": id },
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
          },
        ],
        attributes: ["id", "status", "priceBid", "createdAt", "updatedAt"],
      });
    } catch (error) {
      return error;
    }
  },

  async findDetailByBuyer(userId, id) {
    try {
      return await Transaction.findOne({
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
            attributes: ["id", "role", "name"],
          },
        ],
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  },

  async findDetailBySeller(userId, id) {
    try {
      return await Transaction.findAll({
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
                    attributes: ["id", "role", "name"],
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
          },
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

  async indProductByUser(userId, productsizeId) {
    try {
      return await Transaction.findOne({
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

  async create(createArgs) {
    return await Transaction.create(createArgs);
  },

  async update(id, updateArgs) {
    return await Transaction.update(updateArgs, {
      where: {
        id,
      },
    });
  },
};
