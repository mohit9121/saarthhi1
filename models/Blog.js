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
    },
    likes:{
        type: Number, 
        default: 0
    },
    dislikes:{
        type: Number, 
        default: 0
    },
    comments:{
        type: Number, 
        default: 0
    }
})

module.exports = Blog = mongoose.model('blog', BlogSchema);