const { login } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/login', login);
module.exports = router;