const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inspectionController');

router.get('/stats', ctrl.getStats);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.post('/:id/report-issue', ctrl.reportIssue);
router.put('/:id/resolve-issue', ctrl.resolveIssue);

module.exports = router;
