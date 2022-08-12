const Review = require('../models/Review');
const { find_owner_for_an_item } = require('../utils/controller_utils');
const { async_handler } = require('../utils/async_handler');

exports.getAllReviewsForUser = async_handler(async function (req, res, next) {
    const reviews = await Review.find({ user: req.user.id });
    res.json({
        success: true,
        body: reviews
    });
});

exports.getAllReviewsForItem = async_handler(async function (req, res, next) {
    const reviews = await Review.find({ item: req.params.item_id });
    res.json({
        success: true,
        body: reviews
    });
});

exports.postReview = async_handler(async function (req, res, next) {
    const check = await find_owner_for_an_item(req.params.category_id);
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    if (await Review.findOne({ item: req.params.item_id, user: req.user.id })) {
        throw new Error('you can post at most one review on an item');
    }
    req.body.user = req.user.id;
    req.body.item = req.params.item_id;
    const review = await Review.create(req.body);
    res.json({
        success: true,
        body: review
    });
});

exports.updateReview = async_handler(async function (req, res, next) {
    const review = await Review.findById(req.params.review_id);
    if (!review) {
        throw new Error(`review with id : ${req.params.review_id} doesn't exist`);
    }
    if (review.user.toString() !== req.user.id) {
        throw new Error(`you are not authorized to do this action`);
    }
    Object.keys(req.body).forEach((val) => {
        review[val] = req.body[val];
    });
    await review.save({
        runValidators: true,
        new: true
    });
    res.json({
        success: true,
        data: review
    });
});

exports.deleteReview = async_handler(async function (req, res, next) {
    const review = await Review.findById(req.params.review_id);
    if (!review) {
        throw new Error(`review with id : ${req.params.review_id} doesn't exist`);
    }
    if (review.user.toString() !== req.user.id) {
        throw new Error(`you are not authorized to do this action`);
    }
    await review.remove();
    res.json({
        success: true,
        data: []
    });
});
