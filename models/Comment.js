const mongoose = require('mongoose'); 

const CommentSchema = new mongoose.Schema({
    blogId:{
        type: mongoose.Types.ObjectId
    },
    text:{
        type: String
    },
    username:{
        type: String,
    },
    commentDate:{
        type: Date,
        default: Date.now()
    }, 
    likes:{
        type: Number,
        default: 0
    }, 
    dislikes: {
        type: Number, 
        default: 0
    }
})

module.exports = mongoose.model('comment', CommentSchema);
