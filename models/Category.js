const mongoose = require('mongoose');
const Item = require('./Item');
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name']
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: [true, 'Please provide a shop for the category']
    },
    description: {
      type: String,
      required: [true, 'Please provide category description']
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

CategorySchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'category'
});

CategorySchema.pre('remove', async function () {
  await this.model('Item').deleteMany({
    shop: this._id
  });
});

CategorySchema.pre('deleteMany', { query: true, document: false }, async function () {
  await Item.deleteMany();
});
module.exports = mongoose.model('Category', CategorySchema);