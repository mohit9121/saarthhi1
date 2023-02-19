const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Blog = mongoose.model('blog', BlogSchema);