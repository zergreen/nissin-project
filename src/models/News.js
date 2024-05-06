const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    newsId: {
      type: String,
      required: true,
    },
    topic: { type: String, required: false },
    date: { type: String, required: false},
    detail: { type: String, required: false },
    category: { type: String, required: false },
    image: { type: String, required: false },
    link: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now,
      },
 });
 
module.exports = mongoose.model('News', NewsSchema)


