const router = require('express').Router();
const projectController = require('../controller/projectController');
const auth = require('../middleware/authenticate');

// Public routes
router.get('/', projectController.index);
router.get('/:id', projectController.show);

// Protected routes (authentication required)
router.post('/', auth, projectController.create);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.delete);

module.exports = router;