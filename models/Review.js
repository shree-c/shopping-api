const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
