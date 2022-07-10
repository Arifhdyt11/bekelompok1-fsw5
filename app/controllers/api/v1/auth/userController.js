require("dotenv").config();
const userService = require("../../../../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { promisify } = require("util");
const cloudinary = require("../../../../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token expired");
  }
}

module.exports = {
  async register(req, res) {
    try {
      let { role, name, email, password } = req.body;
      const newUser = await userService.create({
        role: role.toUpperCase(),
        name,
        email,
        password,
        registeredVia: "auth-form",
      });

      const postedData = await userService.getById(newUser.id);

      res.status(201).json({
        status: true,
        message: "User has been created!",
        data: postedData,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async login(req, res) {
    try {
      const user = await userService.getByEmail(req.body.email);
      if (user === null) {
        res.status(400).json({
          status: false,
          message: "Email is not registered!",
        });
        return;
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_TIME,
        }
      );
      res.status(200).json({
        status: true,
        message: "Login successfully!",
        accessToken: token,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    }
  },

  async profile(req, res) {
    try {
      const userTokenId = req.user.id;
      const data = await userService.getById(userTokenId);
      res.status(200).json({
        status: true,
        message: "Successfully find data user",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async updateProfile(req, res) {
    try {
      console.log("file", req.file);
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = verifyToken(token);
      const user = JSON.parse(
        JSON.stringify(await userService.getByEmail(tokenPayload.email))
      );
      delete user.password;

      if (req.file === undefined || req.file === null) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.city = req.body.city;
        user.address = req.body.address;
        user.phone = req.body.phone;
      } else {
        //hapus foto lama
        if (user.image !== null) {
          const oldImage = user.image.substring(65, 85);
          await cloudinaryDestroy(oldImage);
        }
        console.log("user before : ", user.name);
        // Upload foto baru
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const result = await cloudinaryUpload(file);
        const url = result.secure_url;

        // Masukan ke object Args
        user.name = req.body.name;
        user.email = req.body.email;
        user.city = req.body.city;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.image = url;
      }
      await userService.update(user.id, user);
      delete user.password;

      res.status(200).json({
        status: true,
        message: "User Updated",
        data: JSON.parse(JSON.stringify(user)),
      });
    } catch (err) {
      res.status(422).send(err.message);
    }
  },

  async changePassword(req, res) {
    try {
      const userTokenEmail = req.user.email;
      const userTokenId = req.user.id;
      const user = await userService.getByEmail(userTokenEmail);

      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
        return;
      }
      await userService.updateCurrentUser(userTokenId, req.body);

      res.status(200).json({
        status: true,
        message: "Successfully change password!",
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },
};
