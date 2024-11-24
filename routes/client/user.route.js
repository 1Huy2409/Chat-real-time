const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");

//router register
router.get('/register', controller.register);
router.post('/register', controller.registerPost);
//router login
router.get('/login', controller.login);
router.post('/login', controller.loginPost);
//router logout
router.get('/logout', controller.logout);
module.exports = router;