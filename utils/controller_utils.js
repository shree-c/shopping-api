const Item = require('../models/Item');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
exports.find_owner_for_category = async function (id) {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`category with id: ${id} not found`);
    }
    const shop = await Shop.findById(category.shop);
    return { owner: shop.owner.toString(), category };
};

exports.find_owner_for_an_item = async function (id) {
    const item = await Item.findById(id);
    if (!item) {
        throw new Error(`item with id : ${id} doesn't exist`);
    }
    const category = await Category.findById(item.category);
    const shop = await Shop.findById(category.shop);
    return { owner: shop.owner.toString(), item };
};