const router = require('express').Router()
const projectController = require('../controller/projectController')

router.get('/', projectController.index);
// router.get('/detail/:id', portofolioController.show);
// router.get('/:id', portofolioController.detail);


module.exports = router