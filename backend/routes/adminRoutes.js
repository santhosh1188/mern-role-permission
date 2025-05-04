const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/permission', auth, adminController.createPermission);
router.post('/role', auth, adminController.createRole);
router.post('/user', auth, adminController.createUser);

module.exports = router;
