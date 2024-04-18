const express = require("express");
const UserController = require("../controllers/UserController.js");

const router = express.Router();
const userController = new UserController();
const auth = require("../middlewares/auth");


router.post("/getUser", userController.viewUser);
router.post("/update-user", userController.updateUser);

module.exports = router;
