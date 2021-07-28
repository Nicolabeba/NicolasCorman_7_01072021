const db = require("../models");
const Post = db.post;
const Comment = db.comment;

module.exports = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      if (post.id_user !== req.tokenUserId) {
        throw "invalid user";
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
