const Item = require('../models/Item');
const { async_handler } = require('../utils/async_handler');
const { find_owner_for_an_item, find_owner_for_category } = require('../utils/controller_utils');
//i will try to improve this later

//public
exports.getItems = async_handler(async function (req, res, next) {
    const items = await Item.find({ category: req.params.category_id });
    res.json({
        success: true,
        data: items
    });
});

//private
//add items to a category
exports.addItems = async_handler(async function (req, res, next) {
    const check = await find_owner_for_category(req.params.category_id);
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    req.body.forEach(function (val) {
        val.category = req.params.category_id;
    });
    const items = await Item.create(req.body);
    res.json({
        success: true,
        body: items
    });
});

exports.updateItem = async_handler(async function (req, res, next) {
    const check = await find_owner_for_an_item(req.params.item_id);
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    Object.keys(req.body).forEach((val) => {
        check.item[val] = req.body[val];
    });
    check.item.save({
        runValidators: true,
        new: true
    });
    res.json({
        success: true,
        body: check.item
    });
});

exports.deleteItem = async_handler(async function (req, res, next) {
    const check = await find_owner_for_an_item(req.params.item_id);
    if (req.user.id != check.owner) {
        throw new Error('you are not authorized to do this action');
    }
    await check.item.remove();
    res.json({
        success: true,
        body: item
    });
});