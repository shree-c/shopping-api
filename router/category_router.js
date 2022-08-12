const { updateCategory, createCategory, deleteCategory, getCategories } = require('../controllers/category_controller');
const { protect } = require('../middlewares/auth');
const router = require('express').Router();
router.route('/:shop_id/category')
    .get(getCategories)
    .post(protect, createCategory);
router.route('/category/:category_id')
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;