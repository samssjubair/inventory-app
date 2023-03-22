const express= require('express');
const { signupController } = require('../controller/signup.controller');
const router=express.Router();

router.post("/signup", signupController);

module.exports = router;