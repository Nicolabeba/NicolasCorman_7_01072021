const express = require("express");
const router = express.Router();

//  "auth" permet de sécuriser les routes
const auth = require("../middleware/auth");
const postOwner = require("../middleware/post-owner");

// "multer" pour gérer les images
const multer = require("../middleware/multer-config");

// Importation du "controller" concernant les "post"
const postCtrl = require("../controllers/post.controller");

// Router de la création du post
router.post("/post/create", auth, multer, postCtrl.createPost);
// Router de la modification du post
router.put("/post/:id", auth, postOwner, postCtrl.modifyPost);
// Router de la suppression du post
router.delete("/post/:id", auth, postOwner, postCtrl.deletePost);
// Router de l'accès à tous les posts
router.get("/post/all", auth, postCtrl.getAllPost);
// Router de l'accès à un post
router.get("/post/:id", auth, postCtrl.getOnePost);

module.exports = router;
