const router = require('express').Router()
const cmsController = require('../controller/cmsController')
const cmsProjectController = require('../controller/cmsProjectController')

router.get('/', cmsController.index);
router.get('/create', cmsController.create);
router.post('/create', cmsController.doCreate);
router.get('/update/:id', cmsController.detail);
router.post('/update/:id', cmsController.doUpdate);
router.get('/delete/:id', cmsController.doDelete);

// Project Route
router.get('/project', cmsProjectController.index);
router.get('/project/create', cmsProjectController.create);
router.post('/project/create', cmsProjectController.doCreate);
router.get('/project/update/:id', cmsProjectController.detail);
router.post('/project/update/:id', cmsProjectController.doUpdate);
router.get('/project/delete/:id', cmsProjectController.doDelete);

module.exports = router