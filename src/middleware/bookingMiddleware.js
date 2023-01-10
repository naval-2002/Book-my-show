const jwt = require("jsonwebtoken");
const status = require("http-status");

module.exports = function BookingMiddleware() {
  return async function (req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(status.NOT_FOUND)
          .json({ err: "token is not avilable" });
      }
      let verified = await jwt.verify(token, "book");
      if (verified) {
        next();
      }
    } catch (err) {
      res.status(status.NOT_FOUND).json({ err });
    }
  };
};
