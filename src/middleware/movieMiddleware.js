const jwt = require("jsonwebtoken");
const status = require("http-status");

module.exports = function MovieMiddleware() {
  return async function (req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(status.NOT_FOUND)
          .json({ err: "token is not avilable" });
      }
      let verified = await jwt.verify(token, "movie");
      if (verified) {
        next();
      }
    } catch (err) {
      return res.status(status.NOT_FOUND).json({ err });
    }
  };
};
