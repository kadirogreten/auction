const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    firm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuctionImages'
    }],
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    createdAt: {
        type: Date,
        required: false
    },

    updatedAt: {
        type: Date,
        required: false
    },

    deletedAt: {
        type: Date,
        required: false
    }

})

module.exports = mongoose.model("Auction", schema)