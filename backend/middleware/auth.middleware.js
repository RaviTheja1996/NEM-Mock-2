const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, "raviteja", (err, decoded) => {
      if (decoded) {
        req.body.username = decoded.username;
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(400).send({
          msg: "You are not authorized check your user token in headers",
        });
      }
      if (err) {
        res.status(500).send({
          msg: "error ocurred while verifying jwt token",
          error: err.message,
        });
      }
    });
  } else {
    res.status(400).send({ msg: "please login first" });
  }
};

module.exports = { authMiddleware };
