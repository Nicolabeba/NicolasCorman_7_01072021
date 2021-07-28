const db = require("../models");
const Post = db.post;
const Comment = db.comment;

module.exports = (req, res, next) => {
  const id = req.params.id;
  Comment.findByPk(id, { where: { id_user: req.body.userId } })
    .then((comment) => {
      if (comment.id_user !== req.tokenUserId) {
        throw "invalid user";
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
