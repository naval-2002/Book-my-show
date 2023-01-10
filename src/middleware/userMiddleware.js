const jwt = require("jsonwebtoken");
const status = require("http-status");

module.exports = function myMiddleware() {
  return async function (req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "Token is not avilable" });
      }
      const verified = await jwt.verify(token, "user");
      if (verified) {
        next();
      }
    } catch (error) {
      return res.status(status.NOT_FOUND).json(error);
    }
  };
};
