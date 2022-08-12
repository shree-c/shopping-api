const mongoose = require('mongoose');
const Category = require('./Category');
const ShopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide shop name'],
      unique: true,
      minlength: 8
    },
    description: {
      type: String,
      required: [true, 'Please provide shop description']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A shop should have an onwner']
    },
    createdTime: {
      type: Date,
      default: Date.now
    },
    modifiedTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//post hook for deleting its categories after a shop is deleted
ShopSchema.post('remove', async function (next) {
  await this.model('Category').deleteMany({
    shop: this._id
  });
  next();
});

ShopSchema.post('deleteMany', { document: false, query: true }, async function () {
  await Category.deleteMany();
});

ShopSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'shop'
});

module.exports = mongoose.model('Shop', ShopSchema);