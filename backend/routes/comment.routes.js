const express = require("express");
const router = express.Router();

//Important de "auth" qui permet de sécuriser les routes
const auth = require("../middleware/auth");

//Importation du "controller" concernant les "commentaire"
const commentCtrl = require("../controllers/comment.controller");

//création d'un commentaire
router.post("/comment/:id", auth, commentCtrl.createComment);

//recupération du comment
router.get("/comment/:id/comment", commentCtrl.getAllComments);

//suppression d'un commentaire
router.delete("/delete_comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
