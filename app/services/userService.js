require("dotenv").config();
const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);

module.exports = {
  async getById(id) {
    try {
      return await userRepository.findUser(id);
    } catch (err) {
      throw err;
    }
  },

  async getByEmail(email) {
    try {
      return await userRepository.findByEmail(email);
    } catch (err) {
      throw err;
    }
  },

  async delete(email) {
    try {
      return await userRepository.delete(email);
    } catch (err) {
      throw err;
    }
  },

  async generateToken(user) {
    try {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const expiresIn = {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      };
      return jwt.sign(payload, process.env.JWT_SECRET, expiresIn);
    } catch (err) {
      throw err;
    }
  },

  async verifyToken(token) {
    const bearer = token.split("Bearer ")[1];
    const verify = jwt.verify(bearer, process.env.JWT_SECRET);
    if (!verify) {
      throw new Error();
    }
    try {
      return verify;
    } catch (error) {
      return error;
    }
  },

  async comparePassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      return error;
    }
  },

  async handleLogin(requestBody) {
    const user = await userRepository.findByEmail(requestBody.email);
    if (user === null) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await this.comparePassword(
      requestBody.password,
      user.password
    );

    if (isPasswordCorrect === false) {
      throw new Error("Password incorrect");
    }
    try {
      return await this.generateToken(user);
    } catch (error) {
      return error;
    }
  },

  async handleRegister(requestBody) {
    const checkUser = await userRepository.findByEmail(requestBody.email);
    if (checkUser !== null) {
      throw new Error("User already exist");
    }
    try {
      const newUser = await userRepository.create({
        ...requestBody,
        role: requestBody.role.toUpperCase(),
        registeredVia: "auth-form",
      });
      return await userRepository.findUser(newUser.id);
    } catch (error) {
      return error;
    }
  },

  async handleGoogle(response) {
    try {
      const { sub, email, name, picture } = response;

      let user = await userRepository.findByGoogleId(sub);
      if (!user)
        await userRepository.create({
          email,
          name,
          googleId: sub,
          role: "BUYER",
          image: picture,
          registeredVia: "google",
        });

      const token = await this.generateToken(user);
      return token;
    } catch (error) {
      return error;
    }
  },

  async handleUpdateProfile(id, requestBody, requestFile) {
    const { name, province, city, address, phone, role, email, password } =
      requestBody;
    if (role || email || password) {
      throw new Error("You can't update role, email or password");
    }
    try {
      // const updateArgs = { ...requestBody };
      if (requestFile == null || requestFile == undefined) {
        await userRepository.update(id, {
          name,
          province,
          city,
          address,
          phone,
        });
        return await userRepository.findUser(id);
      }
      // Upload avatar to cloudinary
      const fileBase64 = requestFile.buffer.toString("base64");
      const file = `data:${requestFile.mimetype};base64,${fileBase64}`;
      const result = await cloudinaryUpload(file);
      const url = result.secure_url;

      await userRepository.update(id, {
        ...requestBody,
        image: url,
      });

      return await userRepository.findUser(id);
    } catch (error) {
      return error;
    }
  },

  async handleChangePassword(email, id, requestBody) {
    const user = await userRepository.findByEmail(email);
    if (user === null) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await this.comparePassword(
      requestBody.oldPassword,
      user.password
    );

    if (isPasswordCorrect === false) {
      throw new Error("Password incorrect");
    }
    try {
      const newPassword = requestBody.password;
      await userRepository.update(id, {
        password: newPassword,
      });
      return;
    } catch (error) {
      return error;
    }
  },
};
