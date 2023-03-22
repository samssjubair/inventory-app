const express= require('express');
const { signupController } = require('../controller/user.controller');
const { signinController } = require('../controller/user.controller');
const { getMe } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');
const router=express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get('/me',verifyToken,getMe);

module.exports = router;