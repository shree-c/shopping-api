const mongoose = require('mongoose');
const Review = require('./Review');
const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide item name']
    },
    price: {
      type: Number,
      required: [true, 'Please provide item price']
    },
    description: {
      type: String,
      required: [true, 'Please provide item description']
    },
    stockLeft: {
      type: Number,
      required: [true, 'Please provide the number of items present in stock']
    },
    createdTime: {
      type: Date,
      default: Date.now
    },
    modifiedTime: {
      type: Date,
      default: Date.now
    },
    images: {
      type: [String],
      required: [true, 'Please provide atleast one image for an item']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'Please provide a category for the item']
    }
  }
);
//delete reviews
ItemSchema.pre('remove', async function () {
  await this.model('Review').deleteMany({
    item: this._id
  });
});

ItemSchema.pre('deleteMany', { query: true, document: false }, async function () {
  await Review.deleteMany({});
});
module.exports = mongoose.model('Item', ItemSchema);