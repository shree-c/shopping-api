const Category = require('../models/Category');
const Shop = require('../models/Shop');
const { async_handler } = require('../utils/async_handler');
const { find_owner_for_category } = require('../utils/controller_utils');
//create category for a shop
exports.createCategory = async_handler(async function (req, res, next) {
    //check to see if the shop exists and the user is the owner of shop
    const shop = await Shop.findById(req.params.shop_id);
    if (!shop) {
        throw new Error(`the shop with id : ${req.params.shop_id} doesn't exist`);
    }
    if (shop.owner.toString() != req.user.id) {
        throw new Error('you are not authorized to do this action');
    }
    req.body.shop = req.params.shop_id;
    const category = await Category.create(req.body);
    res.json({
        success: true,
        data: category
    });
});

//get categroies for a shop
exports.getCategories = async_handler(async function (req, res, next) {
    const categories = await Category.find({ shop: req.params.shop_id }).populate('items');
    res.json({
        success: true,
        data: categories
    });
});

//update category for a shop
exports.updateCategory = async_handler(async function (req, res, next) {
    const check = await find_owner_for_category(req.params.category_id).owner;
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    Object.keys(req.body).forEach((val) => {
        category[val] = req.body[val];
    });
    await check.category.save({ validateBeforeSave: true, new: true });
    res.json({
        success: true,
        body: check.category
    });
});

//delete category for a shop
exports.deleteCategory = async_handler(async function (req, res, next) {
    const check = await find_owner_for_category(req.params.category_id).owner;
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    const category = await check.category.remove();
    res.json({
        success: true,
        body: category
    });
});