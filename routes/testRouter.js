const express = require("express");
const router = express.Router();

/* GET testing router. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  // res.status({
  //   status: true,
  //   message: "BCR API is up and running - FSW5 Kelompok-1 CH8!",
  // });
  res.status(200).json({
    status: true,
    message:
      "Shoesnarian API is up and running - FSW5 Kelompok-1 Final Project!",
  });
});

module.exports = router;
