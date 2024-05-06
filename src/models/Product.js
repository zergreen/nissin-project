const mongoose = require('mongoose')

// Define the schema for a size
const SizeSchema = new mongoose.Schema({
  _id: false ,
  sizeId: {
      type: String,
      required: true
  },
  sizeType: {
      type: String,
      required: true
  },
});

const BranchSchema = new mongoose.Schema({
  _id: false,
  branchId: {
      type: String,
      required: true
  },
  branchName: {
    type: String,
    required: true
},
});

const ProductSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
    },
    topic: { type: String, required: false },
    price: { type: String, required: false},
    sizesCategory: [SizeSchema],
    branchCategory: [BranchSchema],
    count: { type: String, required: false },
    category: { type: String, required: false },
    image: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
      },
 });


module.exports = mongoose.model('Product', ProductSchema)