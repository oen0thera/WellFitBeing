// routes/user.js

const express = require('express');

const router = express.Router();

// const modifyuserinfo = require("../controller/modifyuserinfo.js");
// const users = require("../controller/user.controller.js");
// const signin = require("../controller/signin.js");
// const signout = require("../controller/signout.js");
// const signup = require("../controller/signup.js");
const ExerciseScheduler = require("../controller/ExerciseScheduler.js");
const DietScheduler = require("../controller/DietScheduler.js");

router.post("/ExerciseScheduler", ExerciseScheduler.ExerciseScheduler)
router.post("/DietScheduler", DietScheduler.DietScheduler)
// router.post("/create", users.create);
// router.get("/getAll", users.findAll);
// router.get("/findOne", users.findOne);
// router.post("/deleteOne", users.deleteOne);
// router.post("/deleteAll", users.deleteAll);

// router.post("/signin", signin.signin)
// router.post("/signout", signout.signout)
// router.post("/signup", signup.signup)
// router.post("/modifyuserinfo", modifyuserinfo.modifyuserinfo)
// router.get("/login", users.getlogin)
module.exports = router;