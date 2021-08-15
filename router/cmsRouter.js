const router = require('express').Router()
const cmsController = require('../controller/cmsController')

router.get('/', cmsController.index);

router.get('/create', cmsController.create);
router.post('/create', cmsController.doCreate);

router.get('/update', cmsController.update);
router.get('/update/:id', cmsController.detail);
router.post('/update/:id', cmsController.doUpdate);
// router.patch('/update/:id', cmsController.doUpdate);
// router.put('/update/:id', cmsController.doUpdate);


router.get('/delete/:id', cmsController.doDelete);

module.exports = router