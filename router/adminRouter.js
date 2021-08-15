const router = require('express').Router();
const userController = require('../controller/adminController');

router.get('/register', userController.register);
router.post('/register', userController.doRegister);
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/logout', userController.logout);

module.exports = router;
