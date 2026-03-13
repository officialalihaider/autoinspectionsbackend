const express = require('express');
const router = express.Router();
const {getAll, update, remove} = require('../controllers/userController');
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);
module.exports = router;
