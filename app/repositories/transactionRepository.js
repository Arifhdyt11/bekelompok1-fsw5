const { Transaction } = require("../models");

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
