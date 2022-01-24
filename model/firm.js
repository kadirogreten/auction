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
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    auctions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
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
}, {
    timestamp: true
})

module.exports = mongoose.model("Firm", schema)