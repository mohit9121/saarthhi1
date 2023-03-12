const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sellerName:{
        type: String
    },
    itemName: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        default: "District1"
    },
    village:{
        type: String,
    }, 
    quantity:{
        type: String,
    }, 
    category:{
        type: String,
        default: "MilkProduct"
    }, 
    description:{
        type: String
    },
    price:{
        type: String
    },
    discount:{
        type: String,
        default: "na"
    }, 
    deliverable:{
        type: Boolean,
        default: false
    },
    links:{
        type: String
    },
    maxQuantity:{
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('item', ItemSchema);

