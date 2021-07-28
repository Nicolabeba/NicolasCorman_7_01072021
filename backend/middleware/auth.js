const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET_KEY_TOKEN);

    const id_user = decodedToken.userId;
    req.tokenUserId = id_user;
    if (req.body.id_user && req.body.id_user !== id_user) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "Requête non authentifiée !" });
  }
};
