//BackEnd/Routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const authController = require('../Controller/authController');
// const {login}=require('../Controller/authController')


// router.post('/register',authController.register );
// router.post('/login',login);
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);

// module.exports = router;


const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../Controller/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;


