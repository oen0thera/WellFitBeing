// routes/user.js

const express = require('express');

const router = express.Router();

const users = require("../controller/user.controller.js");

router.post("/create", users.create);
router.get("/getAll", users.findAll);
router.get("/findOne", users.findOne);
router.post("/deleteOne", users.deleteOne);
router.post("/deleteAll", users.deleteAll);
router.post("/login", users.login)
router.post("/logout", users.logout)
router.post("/register", users.register)
// router.get("/login", users.getlogin)
module.exports = router;