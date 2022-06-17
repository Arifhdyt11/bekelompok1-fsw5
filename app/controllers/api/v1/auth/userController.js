const userService = require("../../../../services/userService");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      // registrasi user
      const hashPassword = await bcrypt.hashSync(req.body.password, 10)
      const data = await userService.create({
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        status: true,
        message: "User successfully registered!",
        data: data,
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
      // login user
      const mail = req.body.email
      const user = await userService.getByEmail(mail);
      if(!user) return res.status(404).send({ message: "Email Not Found" })

      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match) return res.status(400).json({ message: "Wrong Password" });

      const id = user.id;
      const role = user.role;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({id, role, name, email}, process.env.ACCESS_TOKEN, {
        expiresIn: '1h'
      });

      res.status(201).json({ 
        status: true,
        message: "Login Success!",
        accessToken: accessToken });
    } catch (err) {
      res.status(404).json({
        status: false,
        message: (err.message)
      });
    }
  },

};

// async whoami(req, res) {
//   try {
//     const data = await userService.list();
//       res.status(200).json({
//         status: true,
//         message: "Successfully find data",
//         data: data,
//       });
//       res.status(404).json({
//         status: false,
//         message: "Data not found",
//       });
//   } catch (error) {
//     res.status(422).json({
//       status: false,
//       message: error.message,
//     });
//   }
// },

//   async update(req, res) {
//     try {
//       await userService.update(req.params.id, req.body);

//       const data = await userService.get(req.params.id);

//       // get Log info
//       res.status(200).json({
//         status: true,
//         message: "Car has been updated!",
//         data: data,
//       });
//     } catch (err) {
//       res.status(422).json({
//         status: false,
//         message: err.message,
//       });
//     }
//   },

//   async destroy(req, res) {
//     try {
//       await categoryService.delete(req.params.id);
//       res.status(200).json({
//         status: true,
//         message: "Car has been deleted!",
//       });
//     } catch (err) {
//       res.status(422).json({
//         status: false,
//         message: err.message,
//       });
//     }
//   },