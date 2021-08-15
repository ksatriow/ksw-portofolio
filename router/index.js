const router = require('express').Router();
const homeRouter = require('./homeRouter');
const userRouter = require('./adminRouter');
const cmsRouter = require('./cmsRouter');
const projectRouter = require('./projectRouter');
const auth = require('../middleware/authenticate');

router.use('/', homeRouter);
router.use('/user', userRouter);
router.use('/cms', auth, cmsRouter);
router.use('/project', projectRouter);




module.exports = router;