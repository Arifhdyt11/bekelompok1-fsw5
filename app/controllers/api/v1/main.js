module.exports = {
  onLost(req, res) {
    res.status(404).json({
      status: false,
      message: "Route not found!",
    });
  },

  onError(err, req, res, next) {
    res.status(500).json({
      status: false,
      error: {
        name: err.name,
        message: err.message,
      },
    });
  },
};
