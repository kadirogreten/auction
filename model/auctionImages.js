const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    imageType: {
        type: String,
        default: "Image",
        enum: ["Badge", "LiveBadge", "Image",]
    },
    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Auction'
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

module.exports = mongoose.model("AuctionImages", schema)