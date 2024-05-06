const mongoose = require('mongoose');
const Product = require('./Product'); // Ensure this path is correct

const cartItemSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    sizeId: {
        type: String,
        required: false
    },
    branchId: {
        type: String,
        required: false
    },
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
