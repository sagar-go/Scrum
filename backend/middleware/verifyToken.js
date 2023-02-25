const jwt = require("jsonwebtoken");

function verifyToken2(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(404).send("ACCESS Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
      req.tokenDetails = verified;
      next();
    }
  } catch (error) {
    return res.status(400).send("INVALID TOKEN");
  }
}

module.exports = { verifyToken2 };
