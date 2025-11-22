const router = require('express').Router();
const userController = require('../controller/adminController');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');

// Registration disabled - personal portfolio
// router.get('/register', userController.register);
// router.post('/register', registerLimiter, userController.doRegister);

router.get('/login', userController.login);
router.post('/login', loginLimiter, userController.doLogin);
router.get('/logout', userController.logout);

module.exports = router;
