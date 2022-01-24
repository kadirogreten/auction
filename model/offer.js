const mongoose = require("mongoose")

const schema = mongoose.Schema({

    auction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    offerPrice: {
        type: Number,
        required: true,
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

});


module.exports = mongoose.model("Offer", schema)