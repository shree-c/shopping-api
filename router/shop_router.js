const { createShop, getAllShops, updateShop, deleteShop, uploadPhoto, getSingleShop } = require('../controllers/shop_controller');
const { protect } = require('../middlewares/auth');
const router = require('express').Router();
router.route('/')
  .get(protect, getAllShops)
  .put(protect, updateShop)
  .post(protect, createShop);

router.route('/:id/photo')
  .post(protect, uploadPhoto);

router.route('/:id')
  .put(protect, updateShop)
  .delete(protect, deleteShop)
  .get(protect, getSingleShop);

module.exports = router;
