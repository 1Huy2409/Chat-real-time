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
//router forgot password
router.get('/password/forgot', controller.forgotPassword);
router.post('/password/forgot', controller.forgotPasswordPost);
//router otp password
router.get('/password/otp', controller.otpPassword);
router.post('/password/otp', controller.otpPasswordPost);
//router seset password
router.get('/password/reset', controller.resetPassword);
router.post('/password/reset', controller.resetPasswordPost);
module.exports = router;