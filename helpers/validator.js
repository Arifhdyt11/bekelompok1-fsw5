module.exports = {
  async requestRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        res.status(400).json({
          status: false,
          message: "Email and password are required!",
        });
        return;
      }
      if (!password) {
        res.status(400).json({
          status: false,
          message: "Password is required",
        });
        return;
      }
      if (password.length < 8) {
        res.status(400).json({
          status: false,
          message: "Password must be at least 8 characters",
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
  async requestLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          status: false,
          message: "Email and password are required!",
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
  requestChangePassword(req, res, next) {
    try {
      const { oldPassword, password } = req.body;
      if (!oldPassword || !password) {
        res.status(400).json({
          status: false,
          message: "Old password and new password are required!",
        });
        return;
      }
      if (password.length < 8) {
        res.status(400).json({
          status: false,
          message: "Password must be at least 8 characters",
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async requestProduct(req, res, next) {
    try {
      const { name, price, categoryId } = req.body;
      if (!name || !price || !categoryId) {
        res.status(400).json({
          status: false,
          message: "Name are required!",
        });
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  async userIdentity(req, res, next) {
    try {
      const { city, address, phone } = req.user;
      if (
        city === null ||
        address === null ||
        phone === null ||
        city === "" ||
        address === "" ||
        phone === ""
      ) {
        res.status(400).json({
          status: false,
          message: "Please compelete your profile!",
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },
};
