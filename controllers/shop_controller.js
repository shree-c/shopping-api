const { async_handler } = require('../utils/async_handler');
const Shop = require('../models/Shop');
const path = require('path');

exports.createShop = async_handler(async function (req, res, next) {
  req.body.owner = req.user.id;
  let shop = await Shop.findOne({ owner: req.user.id });
  if (shop) {
    throw Error('a user can only create one shop');
  }
  if (req.user.role !== 'shop-owner' && req.user.role !== 'admin') {
    throw Error('you are not authorized to create shops');
  }
  shop = await Shop.create(req.body);
  res.json({
    success: true,
    body: shop
  });
});
//private
exports.getAllShops = async_handler(async function (req, res, next) {
  const shops = await Shop.find({ owner: req.user.id }).populate('categories');
  res.json({
    success: true,
    data: shops
  });
});

//private
exports.updateShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  if (shop.owner.toString() != req.user.id) {
    throw new Error('you are not authorized to do this action');
  }
  Object.keys(req.body).forEach((val) => {
    shop[val] = req.body[val];
  });
  await shop.save({ validateBeforeSave: true });
  res.json({
    success: true,
  });
});

//private
exports.deleteShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  await shop.remove();
  res.json({
    success: true,
    data: []
  });
});
//private
exports.uploadPhoto = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  //check whether user is the owner of shop
  if (req.user.id !== shop.owner.toString()) {
    throw new Error('you are not authorized to do this action');
  }
  //file checks
  //if the file has been uploaded
  if (!req.files || !req.files.heroimage) {
    throw new Error('please upload an image');
  }
  const file = req.files.heroimage;
  console.log(file);
  //mime is correct
  if (!file.mimetype.startsWith('image/')) {
    throw new Error('please upload an image of correct format');
  }
  console.log(Number(process.env.FILE_MAX_SIZE));
  if (file.size > Number(process.env.FILE_MAX_SIZE)) {
    throw new Error(`the uploaded file is greater than 5MB`);
  }
  file.name = `photo_${shop.id}${path.extname(file.name)}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`server error happened, please try later`, 500));
    }
    await Shop.findByIdAndUpdate(shop.id, {
      photo: file.name
    });
    res.status(200).json({
      status: 'success',
      data: file.name
    });
  });
});

//public
exports.getSingleShop = async_handler(async function (req, res, next) {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    throw new Error('shop with id not found');
  }
  console.log(req.user);
  if (req.user.id != shop.owner.toString()) {
    throw new Error('you are not authorized to access this');
  }
  res.json({
    success: true,
    data: shop
  });
});
