const { getItems, addItems, updateItem, deleteItem } = require('../controllers/items_controller');
const { protect } = require('../middlewares/auth');
const router = require('express').Router();

router.route('/category/:category_id')
    .get(getItems)
    .post(protect, addItems);

router.route('/:item_id')
    .put(protect, updateItem)
    .delete(protect, deleteItem);

module.exports = router;