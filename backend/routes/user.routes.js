const express = require("express");
const router = express.Router();
//const db = require("../models");
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");
// Router de l'inscription
router.post("/signup", userCtrl.signup);
// Router de la connexion
router.post("/login", userCtrl.login);
// Router de la suppression
router.delete("/delete/:id", auth, userCtrl.delete);

module.exports = router;
