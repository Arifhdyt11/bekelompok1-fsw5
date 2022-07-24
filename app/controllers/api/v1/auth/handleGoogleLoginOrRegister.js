const axios = require("axios");
const userService = require("../../../../services/userService");

module.exports = {
  async handleGoogleLoginOrRegister(req, res) {
    try {
      const { access_token } = req.body;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const data = await userService.handleGoogle(response.data);

      res.status(201).json({
        status: true,
        message: "User has been created!",
        token: data.token,
      });
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  },
};
