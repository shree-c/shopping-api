const router = require('express').Router();
const { getAllReviewsForUser, getAllReviewsForItem, updateReview, deleteReview, postReview } = require('../controllers/review_controller');
const { protect } = require('../middlewares/auth');
router.route('/')
    .get(protect, getAllReviewsForUser);

router.route('/:item_id')
    .get(getAllReviewsForItem)
    .post(protect, postReview);

router.route('/:review_id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;
